import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsuarioResponse } from '../../../../response/usuarioResponse';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usuarios: UsuarioResponse[] = [];
  usuarioForm: FormGroup;
  isEditing = false;
  currentUserId: number | null = null;
  selectedFile: File | null = null;

  constructor(private usuarioService: UsuarioService, private toastrService: ToastrService, private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      senha: [''],
      aniversario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  submitForm(): void {
    if (this.usuarioForm.invalid) return;

    const formData = new FormData();
    formData.append('nome', this.usuarioForm.get('nome')?.value);
    formData.append('email', this.usuarioForm.get('email')?.value);
    formData.append('login', this.usuarioForm.get('login')?.value);
    formData.append('senha', this.usuarioForm.get('senha')?.value);
    formData.append('aniversario', this.usuarioForm.get('aniversario')?.value);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditing && this.currentUserId !== null) {
      this.usuarioService.updateUsuario(this.currentUserId, formData).subscribe({
        next: () => {
          this.toastrService.success('Usuário atualizado com sucesso!');
          this.loadUsuarios();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao atualizar o usuário!');
        }
      });
    } else {
      this.usuarioService.createUsuario(formData).subscribe({
        next: () => {
          this.toastrService.success('Usuário atualizado com sucesso!');
          this.loadUsuarios();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao atualizar o usuário!');
        }
      });
    }
  }

  editUsuario(usuario: any): void {
    this.isEditing = true;
    this.currentUserId = usuario.id;

    const formattedUsuario = {
      ...usuario,
      aniversario: usuario.aniversario
        ? formatDate(usuario.aniversario, 'yyyy-MM-dd', 'en-US')
        : ''
    };
    this.usuarioForm.patchValue(formattedUsuario);
  }

  deleteUsuario(id: number): void {
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
        this.usuarioService.deleteUsuario(id).subscribe({
          next: () => {

            Swal.fire('Excluído!', 'O usuário foi excluída com sucesso.', 'success');
            this.loadUsuarios();
          },
          error: () => {
            Swal.fire('Erro!', 'Ocorreu um problema ao excluir o usuário.', 'error');
          }
        });
      }
    });
  }

  resetForm(): void {
    this.usuarioForm.reset();
    this.isEditing = false;
    this.currentUserId = null;
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
}
