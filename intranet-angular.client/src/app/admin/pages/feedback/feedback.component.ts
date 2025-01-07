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
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private sugestaoService: SugestaoService) { }

  ngOnInit(): void {
    this.carregarSugestoes();
  }

  carregarSugestoes(): void {
    this.sugestaoService.getSugestaoPaginadas(null, this.page, this.pageSize).subscribe((data) => {
      this.sugestoes = data.data;
      this.totalItems = data.totalRecords;
    });
  }

  filtrarSugestoes(): void {
    if (this.filtro.trim()) {
      this.sugestaoService.getSugestaoPaginadas(this.filtro, this.page, this.pageSize).subscribe((data) => {
        this.sugestoes = data.data;
        this.totalItems = data.totalRecords;
      });
    } else {
      this.carregarSugestoes();
    }
  }

  visualizarSugestao(sugestao: SugestaoResponse): void {
    if (sugestao.lida == false) {
      this.sugestaoService.setLida(sugestao.id, true).subscribe(() => {
        this.carregarSugestoes();
      });
    }
    this.sugestaoSelecionada = sugestao;
  }

  fecharDetalhes(): void {
    this.sugestaoSelecionada = null;
  }

  onFilterChange(): void {
    this.page = 1;
    this.carregarSugestoes();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.carregarSugestoes();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
