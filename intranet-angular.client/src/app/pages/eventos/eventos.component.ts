import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../service/evento.service';
import { EventoResponse } from '../../../response/eventoResponse';

@Component({
  selector: 'app-eventos',
  standalone: false,

  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  eventos: EventoResponse[] = [];
  totalEventos: number = 0
  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventoService.getAll().subscribe(
      (data) => {
        this.eventos = data.map((even) => ({
          id: even.id,
          nome: even.nome,
          descricao: even.descricao,
          localizacao: even.localizacao,
          dataFim: even.dataFim,
          dataInicio: even.dataInicio,
          imagemUrl: `https://localhost:7227/${even.imagemUrl}`
        }));

        this.totalEventos = data.length;
      },
      (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    );
  }

}
