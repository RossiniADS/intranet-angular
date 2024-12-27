import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usuarios: any[] = [];
  usuarioForm: FormGroup;
  isEditing = false;
  currentUserId: number | null = null;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      senha: ['', Validators.required],
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

    const usuario = this.usuarioForm.value;

    if (this.isEditing && this.currentUserId !== null) {
      this.usuarioService.updateUsuario(this.currentUserId, usuario).subscribe(() => {
        this.loadUsuarios();
        this.resetForm();
      });
    } else {
      this.usuarioService.createUsuario(usuario).subscribe(() => {
        this.loadUsuarios();
        this.resetForm();
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
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.loadUsuarios();
    });
  }

  resetForm(): void {
    this.usuarioForm.reset();
    this.isEditing = false;
    this.currentUserId = null;
  }
}
