import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-header',
  standalone: false,

  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit {
  imgUrl: string = '';
  usuario: string = '';
  constructor(private usuarioService: UsuarioService) {

  }
  ngOnInit(): void {
    this.usuario = this.usuarioService.getUserName() || '';

    this.usuarioService.getUsuarioById(Number(this.usuarioService.getUserId())).subscribe({
      next: (data) => {
        this.imgUrl = `${environment.serverUrl}${data.imagemUrl}`
      },
      error: () => {

      }
    })
  }

  sair() {
    this.usuarioService.logout();
  }
}
