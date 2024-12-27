import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../service/evento.service';

@Component({
  selector: 'app-eventos',
  standalone: false,
  
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent  {
  //year: number = new Date().getFullYear();
  //events: any[] = [];

  //constructor(private eventoService: EventoService) { }

  //ngOnInit(): void {
  //  this.loadEvents();
  //}

  //loadEvents(): void {
  //  this.eventoService.getAll().subscribe(
  //    (data) => {
  //      // Ordena os eventos por data (mais recente para mais antiga)
  //      this.events = data.sort(
  //        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  //      );
  //    },
  //    (error) => {
  //      console.error('Erro ao carregar eventos:', error);
  //    }
  //  );
  //}

}
