import { GrupoDeSlidesService } from '../../../service/grupo.de.slides.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginaService } from '../../../service/pagina.service';
import { GroupDeSlideResponse } from '../../../../response/groupDeSlideResponse'
import { NoticiaResponse } from '../../../../response/noticiaResponse';
import { NoticiaService } from '../../../service/noticia.service';
import { PaginaResponse } from '../../../../response/paginaResponse';

@Component({
  selector: 'app-slides',
  standalone: false,

  templateUrl: './slides.component.html',
  styleUrl: './slides.component.css',
})
export class SlidesComponent implements OnInit {
  paginas: PaginaResponse[] = [];
  grupoForm: FormGroup;
  isEditing = false;
  gruposResponse: GroupDeSlideResponse[] = [];
  grupoIdEmEdicao: number = 0;
  noticiasResponse: NoticiaResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private paginaService: PaginaService,
    private grupoDeSlidesService: GrupoDeSlidesService,
    private noticiaService: NoticiaService
  ) {
    this.grupoForm = this.fb.group({
      paginaId: ['', Validators.required],
      grupos: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadPaginas();
    this.loadGrupo();
    this.loadNoticia();
  }

  loadNoticia() {
    this.noticiaService.getNoticias().subscribe((data) => {
      this.noticiasResponse = data;
     })
  }

  loadGrupo() {
    this.grupoDeSlidesService.getAll().subscribe((data) => {
      this.gruposResponse = data;
    })
  }

  // Getter para os grupos
  get grupos(): FormArray {
    return this.grupoForm.get('grupos') as FormArray;
  }

  // Obter slides de um grupo específico
  getSlides(grupoIndex: number): FormArray {
    return this.grupos.at(grupoIndex).get('slides') as FormArray;
  }

  // Adicionar um novo grupo
  addGrupo(): void {
    this.grupos.push(
      this.fb.group({
        nome: ['', Validators.required],
        slides: this.fb.array([]),
      })
    );
  }

  // Remover um grupo
  removeGrupo(index: number): void {
    this.grupos.removeAt(index);
  }

  // Adicionar um slide a um grupo
  addSlide(grupoIndex: number): void {
    this.getSlides(grupoIndex).push(
      this.fb.group({
        titulo: ['', Validators.required],
        descricao: [''],
        noticiaId: [''],
        file: [null],
      })
    );
  }

  // Remover um slide de um grupo
  removeSlide(grupoIndex: number, slideIndex: number): void {
    this.getSlides(grupoIndex).removeAt(slideIndex);
  }

  // Capturar arquivo selecionado
  onSlideFileSelected(event: Event, grupoIndex: number, slideIndex: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const slides = this.getSlides(grupoIndex);
      const slide = slides.at(slideIndex) as FormGroup;
      slide.patchValue({ file });
    }
  }

  // Submeter o formulário
  submitForm(): void {
    if (this.grupoForm.invalid) {
      console.log('Formulário inválido:', this.grupoForm.value);
      return;
    }

    const formData = new FormData();
    const grupos = this.grupoForm.value.grupos;

    grupos.forEach((grupo: any, grupoIndex: number) => {
      formData.append(`Grupos[${grupoIndex}].Nome`, grupo.nome);
      formData.append(`Grupos[${grupoIndex}].PaginaId`, this.grupoForm.value.paginaId);

      grupo.slides.forEach((slide: any, slideIndex: number) => {
        if (slide.file) {
          const fileType = slide.file.type.startsWith('image/') ? '0' : slide.file.type.startsWith('video/') ? '1' : null;

          if (fileType !== null) {
            formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].File`, slide.file);
            formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].Tipo`, fileType);
          } else {
            console.warn(`Arquivo ignorado: tipo não suportado (${slide.file.type})`);
          }
        }

        formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].NoticiaId`, slide.noticiaId);
        formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].Titulo`, slide.titulo);
        formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].Descricao`, slide.descricao);
        formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].Ordem`, slideIndex.toString());
        if (this.isEditing) {
          formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].Id`, slide.id);
          formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].GrupoDeSlidesId`, slide.grupoDeSlidesId);
        }

      });
    });

    if (this.isEditing && this.grupoIdEmEdicao != 0) {
      this.grupoDeSlidesService.updateSlide(this.grupoIdEmEdicao, formData).subscribe({
        next: () => {
          alert('Grupos e slides atualizados com sucesso!');
          this.resetForm();
          this.loadGrupo();
        },
        error: (err) => alert('Erro ao atualizar os grupos e slides: ' + err.message),
      });

    } else {
      this.grupoDeSlidesService.createSlides(formData).subscribe({
        next: () => {
          alert('Grupos e slides cadastrados com sucesso!');
          this.resetForm();
          this.loadGrupo();
        },
        error: (err) => alert('Erro ao salvar os grupos e slides: ' + err.message),
      });
    }
  }

  // Recarregar páginas
  loadPaginas(): void {
    this.paginaService.getPaginas().subscribe((data) => {
      this.paginas = data.sort((a, b) => a.nome.localeCompare(b.nome));
    });
  }

  // Resetar formulário
  resetForm(): void {
    this.grupoForm.reset();
    this.grupos.clear();
    this.isEditing = false;
  }

  editGrupo(index: number): void {
    // Verifica se o índice é válido
    if (index < 0 || index >= this.gruposResponse.length) {
      return;
    }

    this.isEditing = true;
    const grupo = this.gruposResponse[index];
    this.grupoIdEmEdicao = grupo.id;

    if (!grupo) {
      return;
    }

    // Atualiza o formulário com os valores do grupo
    this.grupoForm.patchValue({
      paginaId: grupo.paginaId,
    });

    // Limpa os grupos existentes no formulário
    this.grupos.clear();

    // Adiciona o grupo ao formulário
    const grupoFormGroup = this.fb.group({
      nome: [grupo.nome, Validators.required],
      slides: this.fb.array([]),
    });

    // Popula os slides do grupo
    grupo.slides.forEach((slide) => {
      const slideFormGroup = this.fb.group({
        id: [slide.id],
        grupoDeSlidesId: [slide.grupoDeSlidesId],
        titulo: [slide.titulo, Validators.required],
        descricao: [slide.descricao],
        noticiaId: [slide.noticiaId],
        file: [null],
      });

      (grupoFormGroup.get('slides') as FormArray).push(slideFormGroup);
    });

    this.grupos.push(grupoFormGroup);
  }


  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este grupo?')) {
      this.grupoDeSlidesService.deleteGrupoDeSlide(id).subscribe({
        next: () => this.loadGrupo(),
        error: (err) => alert('Erro ao excluir o grupo: ' + err.message),
      });
    }
  }
}
