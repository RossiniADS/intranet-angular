import { SlideService } from '../../../service/slides.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginaService } from '../../../service/pagina.service';

@Component({
  selector: 'app-slides',
  standalone: false,

  templateUrl: './slides.component.html',
  styleUrl: './slides.component.css',
})
export class SlidesComponent implements OnInit {
  paginas: any[] = [];
  grupoForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private paginaService: PaginaService,
    private slideService: SlideService
  ) {
    this.grupoForm = this.fb.group({
      paginaId: ['', Validators.required],
      grupos: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadPaginas();
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
      grupo.slides.forEach((slide: any, slideIndex: number) => {
        if (slide.file) {
          formData.append(`grupos[${grupoIndex}][slides][${slideIndex}][file]`, slide.file);
        }
        formData.append(`grupos[${grupoIndex}][slides][${slideIndex}][titulo]`, slide.titulo);
        formData.append(`grupos[${grupoIndex}][slides][${slideIndex}][descricao]`, slide.descricao);
      });
      formData.append(`grupos[${grupoIndex}][nome]`, grupo.nome);
    });

    formData.append('paginaId', this.grupoForm.value.paginaId);

    this.slideService.createSlides(formData).subscribe({
      next: () => {
        alert('Grupos e slides cadastrados com sucesso!');
        this.resetForm();
      },
      error: (err) => alert('Erro ao salvar os grupos e slides: ' + err.message),
    });
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
}
