import { Component } from '@angular/core';
import { PaginaService } from '../../../service/pagina.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SlideService } from '../../../service/slides.service';

@Component({
  selector: 'app-slides',
  standalone: false,

  templateUrl: './slides.component.html',
  styleUrl: './slides.component.css'
})
export class SlidesComponent {
  paginas: any[] = [];
  slides: any[] = [];
  gruposSlides: any[] = [];
  paginaForm: FormGroup;
  slideForm: FormGroup;
  isEditingPagina = false;
  isEditingSlide = false;
  currentPageId: number | null = null;
  currentSlideId: number | null = null;

  constructor(private paginaService: PaginaService, private slideService: SlideService, private fb: FormBuilder) {
    this.paginaForm = this.fb.group({
      titulo: ['', Validators.required],
    });

    this.slideForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      url: ['', Validators.required],
      ordem: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPaginas();
    this.loadSlides();
  }

  loadPaginas(): void {
    this.paginaService.getPaginas().subscribe((data) => {
      this.paginas = data;
    });
  }

  loadSlides(): void {
    this.slideService.getAll().subscribe((data) => {
      this.slides = data;
      this.groupSlidesByOrder();
    });
  }

  groupSlidesByOrder(): void {
    const grouped = this.slides.reduce((acc, slide) => {
      const ordem = slide.ordem;
      if (!acc[ordem]) acc[ordem] = { ordem: ordem, slides: [] };
      acc[ordem].slides.push(slide);
      return acc;
    }, {});

    this.gruposSlides = Object.values(grouped);
  }

  submitForm(): void {
    if (this.paginaForm.invalid) return;

    const pagina = this.paginaForm.value;

    if (this.isEditingPagina && this.currentPageId !== null) {
      this.paginaService.updatePagina(this.currentPageId, pagina).subscribe(() => {
        this.loadPaginas();
        this.resetPaginaForm();
      });
    } else {
      this.paginaService.createPagina(pagina).subscribe(() => {
        this.loadPaginas();
        this.resetPaginaForm();
      });
    }
  }

  editPagina(pagina: any): void {
    this.isEditingPagina = true;
    this.currentPageId = pagina.id;
    this.paginaForm.patchValue(pagina);
  }

  deletePagina(id: number): void {
    this.paginaService.deletePagina(id).subscribe(() => {
      this.loadPaginas();
    });
  }

  resetPaginaForm(): void {
    this.paginaForm.reset();
    this.isEditingPagina = false;
    this.currentPageId = null;
  }

  editSlide(slide: any): void {
    this.isEditingSlide = true;
    this.currentSlideId = slide.id;
    this.slideForm.patchValue(slide);
  }

  submitSlideForm(): void {
    if (this.slideForm.invalid) return;

    const slide = this.slideForm.value;

    if (this.isEditingSlide && this.currentSlideId !== null) {
      this.slideService.updateSlide(this.currentSlideId, slide).subscribe(() => {
        this.loadSlides();
        this.resetSlideForm();
      });
    } else {
      this.slideService.createSlides(slide).subscribe(() => {
        this.loadSlides();
        this.resetSlideForm();
      });
    }
  }

  deleteSlide(id: number): void {
    this.slideService.deleteSlide(id).subscribe(() => {
      this.loadSlides();
    });
  }

  resetSlideForm(): void {
    this.slideForm.reset();
    this.isEditingSlide = false;
    this.currentSlideId = null;
  }

}
