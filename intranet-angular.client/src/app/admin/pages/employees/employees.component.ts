import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../../service/funcionario.service';
import { formatDate } from '@angular/common';
import { FuncionarioResponse } from '../../../../response/funcionaResponse';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  standalone: false,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  funcionarios: FuncionarioResponse[] = [{
    id: 0,
    cargo: '',
    dataNascimento: new Date(),
    departamento: '',
    email: '',
    imagemUrl: '',
    nome: ''
  }];
  funcionarioForm: FormGroup;
  isEditing = false;
  currentFuncionarioId: number | null = null;
  selectedFile: File | null = null;
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private funcionarioService: FuncionarioService, private toastrService: ToastrService, private fb: FormBuilder) {
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cargo: ['', Validators.required],
      departamento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFuncionarios();
  }

  loadFuncionarios(): void {
    this.funcionarioService.getFuncionarioPaginadas(this.page, this.pageSize).subscribe((data) => {
      this.funcionarios = data.data.map(fun => ({
        id: fun.id,
        cargo: fun.cargo,
        imagemUrl: fun.imagemUrl,
        nome: fun.nome,
        dataNascimento: fun.dataNascimento,
        departamento: fun.departamento,
        email: fun.email
      }));
      this.totalItems = data.totalRecords;
    });
  }

  submitForm(): void {
    if (this.funcionarioForm.invalid) return;

    const formData = new FormData();
    formData.append('nome', this.funcionarioForm.get('nome')?.value);
    formData.append('cargo', this.funcionarioForm.get('cargo')?.value);
    formData.append('departamento', this.funcionarioForm.get('departamento')?.value);
    formData.append('dataNascimento', this.funcionarioForm.get('dataNascimento')?.value);
    formData.append('email', this.funcionarioForm.get('email')?.value);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditing && this.currentFuncionarioId !== null) {
      this.funcionarioService.updateFuncionario(this.currentFuncionarioId, formData).subscribe({
        next: () => {
          this.toastrService.success('Funcionário atualizado com sucesso!');
          this.loadFuncionarios();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao atualizar o funcionário!');
        }
      });
    } else {
      this.funcionarioService.createFuncionario(formData).subscribe({
        next: () => {
          this.toastrService.success('Funcionário adicionado com sucesso!');
          this.loadFuncionarios();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao adicionar o funcionário!');
        }
      });
    }
  }

  editFuncionario(funcionario: any): void {
    this.isEditing = true;
    this.currentFuncionarioId = funcionario.id;

    // Verifica e formata a data de nascimento
    const formattedFuncionario = {
      ...funcionario,
      dataNascimento: funcionario.dataNascimento
        ? formatDate(funcionario.dataNascimento, 'yyyy-MM-dd', 'en-US')
        : ''
    };

    this.funcionarioForm.patchValue(formattedFuncionario);
  }

  deleteFuncionario(id: number): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcionarioService.deleteFuncionario(id).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'O funcionário foi excluído com sucesso.', 'success');
            this.loadFuncionarios();
          },
          error: () => {
            Swal.fire('Erro!', 'Ocorreu um problema ao excluir o funcionário.', 'error');
          }
        });
      }
    });
  }

  resetForm(): void {
    this.funcionarioForm.reset();
    this.isEditing = false;
    this.currentFuncionarioId = null;
    this.selectedFile = null;
    this.resetFileInputs();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  resetFileInputs(): void {
    // Limpar os inputs de arquivos na tela
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input: any) => {
      input.value = '';  // Limpa o campo de arquivo
    });
  }

  onFilterChange(): void {
    this.page = 1;
    this.loadFuncionarios();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadFuncionarios();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
