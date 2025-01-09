import { Component } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-admin-header',
  standalone: false,
  
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(private usuarioService: UsuarioService) {

  }
  sair() {
    this.usuarioService.logout();
  }
}
