import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../service/funcionario.service';
import { FuncionarioResponse } from '../../../response/funcionaResponse';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-aniversariantes',
  standalone: false,
  templateUrl: './aniversariantes.component.html',
  styleUrl: './aniversariantes.component.css'
})
export class AniversariantesComponent implements OnInit {
  funcionarios: FuncionarioResponse[] = [
    {
      id: 0,
      cargo: '',
      imagemUrl: '',
      nome: '',
      dataNascimento: new Date(),
      departamento: '',
      email: ''
    }
  ];

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.funcionarioService.getFuncionarios().subscribe((data) => {
      this.funcionarios = data.map((funcionario) => ({
        id: funcionario.id,
        nome: funcionario.nome,
        cargo: funcionario.cargo,
        imagemUrl: `${environment.serverUrl}${funcionario.imagemUrl}`,
        dataNascimento: funcionario.dataNascimento,
        departamento: funcionario.departamento,
        email: funcionario.email
      }));
    })
  }
}
