import { Component } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = '';
  senha = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  submit(): void {
    this.usuarioService.login(this.login, this.senha).subscribe({
      next: (response) => {
        this.usuarioService.saveToken(response.token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        alert('Login failed');
      },
    });
  }
}
