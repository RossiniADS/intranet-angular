import { Component, OnInit } from '@angular/core';
import { CardapioResponse } from '../../../response/cardapioResponse';
import { CardapioService } from '../../service/cardapio.service';
import { DiaSemana } from '../../enum/dia-semana.enum';

@Component({
  selector: 'app-cardapio',
  standalone: false,

  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent implements OnInit {
  cardapios: CardapioResponse[] = [];
  constructor(private cardapioService: CardapioService) {

  }
  ngOnInit(): void {
    this.cardapioService.getAll().subscribe((data) => {
      this.cardapios = data.map((car) => ({
        id: car.id,
        descricao: car.descricao,
        diaDaSemana: car.diaDaSemana,
        imagemUrl: `https://localhost:7227/${car.imagemUrl}`,
        titulo: car.titulo
      }));
    })
  }

  getDiaSemanaTexto(dia: number): string {
    return DiaSemana[dia] || dia.toString();
  }
}
