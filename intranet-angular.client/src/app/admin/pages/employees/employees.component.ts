import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../../service/funcionario.service';
import { formatDate } from '@angular/common';
import { FuncionarioResponse } from '../../../../response/funcionaResponse';

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

  constructor(private funcionarioService: FuncionarioService, private fb: FormBuilder) {
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
    this.funcionarioService.getFuncionarios().subscribe((data) => {
      this.funcionarios = data.map(fun => ({
        id: fun.id,
        cargo: fun.cargo,
        imagemUrl: fun.imagemUrl,
        nome: fun.nome,
        dataNascimento: fun.dataNascimento,
        departamento: fun.departamento,
        email: fun.email
      }));
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
      this.funcionarioService.updateFuncionario(this.currentFuncionarioId, formData).subscribe(() => {
        this.loadFuncionarios();
        this.resetForm();
      });
    } else {
      this.funcionarioService.createFuncionario(formData).subscribe(() => {
        this.loadFuncionarios();
        this.resetForm();
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
    this.funcionarioService.deleteFuncionario(id).subscribe(() => {
      this.loadFuncionarios();
    });
  }

  resetForm(): void {
    this.funcionarioForm.reset();
    this.isEditing = false;
    this.currentFuncionarioId = null;
    this.selectedFile = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
