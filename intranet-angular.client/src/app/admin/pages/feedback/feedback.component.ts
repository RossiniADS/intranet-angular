import { Component, OnInit } from '@angular/core';
import { SugestaoResponse } from '../../../../response/sugestaoResponse';
import { SugestaoService } from '../../../service/sugestao.service';

@Component({
  selector: 'app-feedback',
  standalone: false,

  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {
  sugestoes: SugestaoResponse[] = [];
  sugestaoSelecionada: SugestaoResponse | null = null;
  filtro: string = '';

  constructor(private sugestaoService: SugestaoService) { }

  ngOnInit(): void {
    this.carregarSugestoes();
  }

  carregarSugestoes(): void {
    this.sugestaoService.getAll(null).subscribe((data) => {
      this.sugestoes = data;
    });
  }

  filtrarSugestoes(): void {
    if (this.filtro.trim()) {
      this.sugestaoService.getAll(this.filtro).subscribe((data) => {
        this.sugestoes = data;
      });
    } else {
      this.carregarSugestoes();
    }
  }

  visualizarSugestao(sugestao: SugestaoResponse): void {
    if (sugestao.lida == false) {
      this.sugestaoService.setLida(sugestao.id, true).subscribe();
    }
    this.sugestaoSelecionada = sugestao;
  }

  fecharDetalhes(): void {
    this.sugestaoSelecionada = null;
  }
}
