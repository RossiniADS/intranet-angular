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

  // Armazena os arquivos selecionados
  selectedFiles: { [key: string]: File | null } = {
    main: null,       // 750x645
    secondary: null,  // 750x375
    tertiary: null,   // 360x245
  };

  // Armazena mensagens de erro por tipo de imagem
  imageErrors: { [key: string]: string | null } = {
    main: null,
    secondary: null,
    tertiary: null,
  };

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
    if (this.noticiaForm.invalid || this.hasImageErrors()) return;

    const formData = new FormData();

    // Adiciona os campos do formulário ao FormData
    Object.keys(this.noticiaForm.value).forEach((key) => {
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

    // Adiciona os arquivos ao FormData
    if (this.selectedFiles['main']) {
      formData.append('midiaPrincipal', this.selectedFiles['main']);
    }
    if (this.selectedFiles['secondary']) {
      formData.append('midiaSecundaria', this.selectedFiles['secondary']);
    }
    if (this.selectedFiles['tertiary']) {
      formData.append('midiaTerciaria', this.selectedFiles['tertiary']);
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

  onFileSelected(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const image = new Image();
      const reader = new FileReader();

      reader.onload = (e: any) => {
        image.src = e.target.result;
        image.onload = () => {
          const width = image.width;
          const height = image.height;

          // Validação das dimensões por tipo
          if (type === 'main' && (width !== 750 || height !== 645)) {
            this.imageErrors['main'] = 'A imagem principal precisa ter exatamente 750x645 pixels.';
            this.selectedFiles['main'] = null;
          } else if (type === 'secondary' && (width !== 750 || height !== 375)) {
            this.imageErrors['secondary'] = 'A imagem secundária precisa ter exatamente 750x375 pixels.';
            this.selectedFiles['secondary'] = null;
          } else if (type === 'tertiary' && (width !== 360 || height !== 245)) {
            this.imageErrors['tertiary'] = 'A imagem terciária precisa ter exatamente 360x245 pixels.';
            this.selectedFiles['tertiary'] = null;
          } else {
            // Se for válido, limpa o erro e armazena o arquivo
            this.imageErrors[type] = null;
            this.selectedFiles[type] = file;
          }
        };
      };

      reader.readAsDataURL(file);
    }
  }

  hasImageErrors(): boolean {
    return !!this.imageErrors['main'] || !!this.imageErrors['secondary'] || !!this.imageErrors['tertiary'];
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
      dataPublicacao: new Date(),
    });
    this.selectedFiles = {
      main: null,
      secondary: null,
      tertiary: null,
    };
    this.imageErrors = {
      main: null,
      secondary: null,
      tertiary: null,
    };
  }

  processNoticias() {
    this.noticias = this.noticias.map((noticia) => ({
      ...noticia,
      categoriaNomes: noticia.categoria?.map((cat) => cat.nome).join(', ') || '',
    }));
  }
}
