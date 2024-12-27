import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../../service/noticia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../service/categoria.service';
import { NoticiaResponse } from '../../../../response/noticiaResponse';

@Component({
  selector: 'app-news',
  standalone: false,
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  noticias: NoticiaResponse[] = [];
  categorias: { id: number; nome: string }[] = [];
  noticiaForm: FormGroup;
  isEditing = false;
  selectedNoticiaId: number | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private noticiaService: NoticiaService, private categoriaService: CategoriaService) {
    this.noticiaForm = this.fb.group({
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
      descricao: ['', Validators.required],
      autorId: [null],
      categoriaIds: [[], Validators.required],
      isTrendingTop: [false]
    });
  }

  ngOnInit(): void {
    this.loadNoticias();
    this.loadCategorias();
  }

  loadNoticias(): void {
    this.noticiaService.getNoticias().subscribe(data => {
      this.noticias = data;
      this.processNoticias();
    });
  }

  loadCategorias(): void {
    this.categoriaService.getAll().subscribe(data => {
      this.categorias = data;
    });
  }

  saveNoticia(): void {
    if (this.noticiaForm.invalid) return;
    const formData = new FormData();

    // Adiciona os campos do formulário ao FormData
    Object.keys(this.noticiaForm.value).forEach(key => {
      if (key === 'categoriaIds') {
        this.noticiaForm.value[key]?.forEach((id: number) => {
          formData.append('categoriaIds', id.toString());
        });
      } else if (this.noticiaForm.value[key] === null || this.noticiaForm.value[key] === undefined) {
        formData.append(key, '');
      } else {
        formData.append(key, this.noticiaForm.value[key]);
      }
    });

    // Adiciona o arquivo ao FormData, se selecionado
    if (this.selectedFile) {
      formData.append('midias', this.selectedFile);
    }

    if (this.isEditing && this.selectedNoticiaId !== null) {
      this.noticiaService.updateNoticia(this.selectedNoticiaId, formData).subscribe(() => {
        this.loadNoticias();
        this.resetForm();
      });
    } else {
      this.noticiaService.createNoticia(formData).subscribe(() => {
        this.loadNoticias();
        this.resetForm();
      });
    }
  }


  convertToHtml(content: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerHTML;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  editNoticia(noticia: NoticiaResponse): void {
    this.isEditing = true;
    this.selectedNoticiaId = noticia.id;
    const categoriaIds = noticia.categoria.map(categoria => categoria.id);

    this.noticiaForm.patchValue({
      ...noticia,
      categoriaIds
    })
  }

  deleteNoticia(id: number): void {
    this.noticiaService.deleteNoticia(id).subscribe(() => {
      this.loadNoticias();
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedNoticiaId = null;
    this.noticiaForm.reset({
      dataPublicacao: new Date()
    });
    this.selectedFile = null;
  }

  processNoticias() {
    this.noticias = this.noticias.map(noticia => ({
      ...noticia,
      categoriaNomes: noticia.categoria?.map(cat => cat.nome).join(', ') || ''
    }));
  }
}
