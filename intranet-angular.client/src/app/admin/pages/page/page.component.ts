import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginaService } from '../../../service/pagina.service';
import { PaginaResponse } from '../../../../response/paginaResponse';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent implements OnInit {
  paginas: PaginaResponse[] = [];
  paginaForm: FormGroup;
  isEditing = false;
  currentPaginaId: number | null = null;

  constructor(private paginaService: PaginaService, private fb: FormBuilder) {
    this.paginaForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPaginas();
  }

  loadPaginas(): void {
    this.paginaService.getPaginas().subscribe(
      (data) => {
        this.paginas = data;
      });
  }

  submitForm(): void {
    if (this.paginaForm.invalid) return;

    const pagina = this.paginaForm.value;

    if (this.isEditing && this.currentPaginaId !== null) {
      this.paginaService.updatePagina(this.currentPaginaId, pagina).subscribe(() => {
        this.loadPaginas();
        this.resetForm();
      });
    } else {
      this.paginaService.createPagina(pagina).subscribe(() => {
        this.loadPaginas();
        this.resetForm();
      });
    }
  }

  editPagina(pagina: any): void {
    this.isEditing = true;
    this.currentPaginaId = pagina.id;
    this.paginaForm.patchValue(pagina);
  }

  deletePagina(id: number): void {
    this.paginaService.deletePagina(id).subscribe(() => {
      this.loadPaginas();
    });
  }

  resetForm(): void {
    this.paginaForm.reset();
    this.isEditing = false;
    this.currentPaginaId = null;
  }
}
