import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../service/funcionario.service';

@Component({
  selector: 'app-aniversariantes',
  standalone: false,
  templateUrl: './aniversariantes.component.html',
  styleUrl: './aniversariantes.component.css'
})
export class AniversariantesComponent implements OnInit {
  funcionarios = [
    {
      name: '',
      role: '',
      image: ''
    }
  ];

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.funcionarioService.getFuncionarios().subscribe((data) => {
      this.funcionarios = data.map((funcionario) => ({
        name: funcionario.nome,
        role: funcionario.cargo,
        image: `https://localhost:7227/${funcionario.imgUrl}`
      }));
    })
  }
}
