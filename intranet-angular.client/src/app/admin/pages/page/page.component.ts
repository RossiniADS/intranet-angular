import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PaginaService } from '../../../service/pagina.service';
import { PaginaResponse } from '../../../../response/paginaResponse';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
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
      configuracoesDeGrupos: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadPaginas();
  }

  get configuracoesDeGrupos(): FormArray {
    return this.paginaForm.get('configuracoesDeGrupos') as FormArray;
  }

  loadPaginas(): void {
    this.paginaService.getPaginas().subscribe((data) => {
      this.paginas = data;
    });
  }

  adicionarConfiguracao(): void {
    const grupoForm = this.fb.group({
      posicao: [null, [Validators.required, Validators.min(1)]],
      tipoDeMidia: [0, [Validators.required]],
    });
    this.configuracoesDeGrupos.push(grupoForm);
  }

  removerConfiguracao(index: number): void {
    this.configuracoesDeGrupos.removeAt(index);
  }

  submitForm(): void {
    if (this.paginaForm.invalid) return;

    const pagina = this.paginaForm.value;
    pagina.configuracoesDeGrupos = pagina.configuracoesDeGrupos.map((grupo: any) => ({
      ...grupo, tipoDeMidia: Number(grupo.tipoDeMidia),
    }));

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

  editPagina(pagina: PaginaResponse): void {
    this.isEditing = true;
    this.currentPaginaId = pagina.id;

    // Atualiza o formulário principal com os valores da página
    this.paginaForm.patchValue({
      nome: pagina.nome,
      descricao: pagina.descricao,
    });

    // Limpa as configurações de grupos existentes no formulário
    this.configuracoesDeGrupos.clear();

    // Adiciona as configurações dos grupos de slides ao formulário
    if (pagina.configuracoesDeGrupos && pagina.configuracoesDeGrupos.length > 0) {
      pagina.configuracoesDeGrupos.forEach((grupo: any) => {
        const grupoForm = this.fb.group({
          posicao: [grupo.posicao, Validators.required],
          tipoDeMidia: [grupo.tipoDeMidia, Validators.required],
        });
        this.configuracoesDeGrupos.push(grupoForm);
      });
    }
  }


  deletePagina(id: number): void {
    this.paginaService.deletePagina(id).subscribe(() => {
      this.loadPaginas();
    });
  }

  resetForm(): void {
    this.paginaForm.reset();
    this.configuracoesDeGrupos.clear();
    this.isEditing = false;
    this.currentPaginaId = null;
  }
}
