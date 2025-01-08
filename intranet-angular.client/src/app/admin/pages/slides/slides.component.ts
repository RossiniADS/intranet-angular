import { GrupoDeSlidesService } from '../../../service/grupo.de.slides.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginaService } from '../../../service/pagina.service';
import { GroupDeSlideResponse } from '../../../../response/groupDeSlideResponse'
import { NoticiaResponse } from '../../../../response/noticiaResponse';
import { NoticiaService } from '../../../service/noticia.service';
import { PaginaResponse } from '../../../../response/paginaResponse';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
  paginaSelecionada: PaginaResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private paginaService: PaginaService,
    private grupoDeSlidesService: GrupoDeSlidesService,
    private noticiaService: NoticiaService,
    private toastrService: ToastrService
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

  get grupos(): FormArray {
    return this.grupoForm.get('grupos') as FormArray;
  }

  getSlides(grupoIndex: number): FormArray {
    return this.grupos.at(grupoIndex).get('slides') as FormArray;
  }

  addGrupo(): void {
    this.grupos.push(
      this.fb.group({
        nome: ['', Validators.required],
        posicao: [1, Validators.required],
        slides: this.fb.array([]),
      })
    );
  }

  removeGrupo(index: number): void {
    this.grupos.removeAt(index);
  }

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

  removeSlide(grupoIndex: number, slideIndex: number): void {
    this.getSlides(grupoIndex).removeAt(slideIndex);
  }

  onSlideFileSelected(event: Event, grupoIndex: number, slideIndex: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const slides = this.getSlides(grupoIndex);
      const slide = slides.at(slideIndex) as FormGroup;
      slide.patchValue({ file });
    }
  }

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
      formData.append(`Grupos[${grupoIndex}].Posicao`, grupo.posicao);

      grupo.slides.forEach((slide: any, slideIndex: number) => {
        if (slide.file) {
          const fileType = slide.file.type.startsWith('image/') ? '0' : slide.file.type.startsWith('video/') ? '1' : null;

          if (fileType !== null) {
            formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].File`, slide.file);
            formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].Tipo`, fileType);
          } else {
            this.toastrService.warning(`Arquivo ignorado: tipo não suportado (${slide.file.type})`);
          }
        }

        formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].NoticiaId`, slide.noticiaId);
        formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].Titulo`, slide.titulo);
        formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].Descricao`, slide.descricao);
        formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].Ordem`, slideIndex.toString());
        if (this.isEditing && slide.id && slide.grupoDeSlidesId) {
          formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].Id`, slide.id);
          formData.append(`Grupos[${grupoIndex}].Slides[${slideIndex}].GrupoDeSlidesId`, slide.grupoDeSlidesId);
        }

      });
    });

    if (this.isEditing && this.grupoIdEmEdicao != 0) {
      this.grupoDeSlidesService.updateSlide(this.grupoIdEmEdicao, formData).subscribe({
        next: () => {
          this.toastrService.success('Grupos e slides atualizados com sucesso!');
          this.resetForm();
          this.loadGrupo();
        },
        error: (err) => {
          this.toastrService.error('Erro ao atualizar os grupos e slides!');
        }
      });

    } else {
      this.grupoDeSlidesService.createSlides(formData).subscribe({
        next: () => {
          this.toastrService.success('Grupos e slides adicionados com sucesso!');
          this.resetForm();
          this.loadGrupo();
        },
        error: (err) => {
          this.toastrService.error('Erro ao adicionar os grupos e slides!');
        }
      });
    }
  }

  loadPaginas(): void {
    this.paginaService.getPaginas().subscribe((data) => {
      this.paginas = data.sort((a, b) => a.nome.localeCompare(b.nome));
    });
  }

  resetForm(): void {
    this.grupoForm.reset();
    this.grupos.clear();
    this.isEditing = false;
    this.resetFileInputs();
  }

  editGrupo(index: number): void {
    if (index < 0 || index >= this.gruposResponse.length) {
      return;
    }

    this.isEditing = true;
    const grupo = this.gruposResponse[index];
    this.grupoIdEmEdicao = grupo.id;

    if (!grupo) {
      return;
    }

    this.grupoForm.patchValue({
      paginaId: grupo.paginaId,
    });

    this.grupos.clear();

    const grupoFormGroup = this.fb.group({
      nome: [grupo.nome, Validators.required],
      posicao: [grupo.posicao, Validators.required],
      slides: this.fb.array([]),
    });

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
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.grupoDeSlidesService.deleteGrupoDeSlide(id).subscribe({
          next: () => {

            Swal.fire('Excluído!', 'O grupo foi excluído com sucesso.', 'success');
            this.loadGrupo();
          },
          error: () => {
            Swal.fire('Erro!', 'Ocorreu um problema ao excluir o grupo.', 'error');
          }
        });
      }
    });
  }

  resetFileInputs(): void {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input: any) => {
      input.value = '';
    });
  }

  onPaginaChange(event: Event): void {
    const paginaId = +this.grupoForm.get('paginaId')?.value;
    this.paginaSelecionada = this.paginas.find((pagina) => pagina.id === paginaId) || null;
    this.grupos.clear();
  }

  canAddGrupo(): boolean {
    return this.paginaSelecionada ? this.grupos.length < this.paginaSelecionada.configuracoesDeGrupos.length : false;
  }

  canAddSlide(grupoIndex: number): boolean {
    if (!this.paginaSelecionada) return false;
    const configuracao = this.paginaSelecionada.configuracoesDeGrupos[grupoIndex];
    return configuracao !== undefined;
  }
}
