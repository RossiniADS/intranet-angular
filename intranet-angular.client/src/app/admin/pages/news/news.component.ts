import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../../service/noticia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../service/categoria.service';
import { NoticiaResponse } from '../../../../response/noticiaResponse';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../service/usuario.service';

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
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  // Armazena os arquivos selecionados
  selectedFiles: { [key: string]: File | null } = {
    main: null,       // 750x645
    //secondary: null,  // 750x375
    //tertiary: null,   // 360x245
  };

  // Armazena mensagens de erro por tipo de imagem
  imageErrors: { [key: string]: string | null } = {
    main: null,
    //secondary: null,
    //tertiary: null,
  };

  constructor(private fb: FormBuilder, private noticiaService: NoticiaService, private usuarioService: UsuarioService, private toastrService: ToastrService, private categoriaService: CategoriaService) {
    this.noticiaForm = this.fb.group({
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
      descricao: ['', Validators.required],
      autorId: [this.usuarioService.getUserId()],
      categoriaIds: [[], Validators.required],
      isTrendingTop: [false]
    });
  }

  ngOnInit(): void {
    this.loadNoticias();
    this.loadCategorias();
  }

  loadNoticias(): void {
    this.noticiaService.getNoticiasPaginadas(null, this.page, this.pageSize).subscribe(data => {
      this.noticias = data.data;
      this.totalItems = data.totalRecords;
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
    //if (this.selectedFiles['secondary']) {
    //  formData.append('midiaSecundaria', this.selectedFiles['secondary']);
    //}
    //if (this.selectedFiles['tertiary']) {
    //  formData.append('midiaTerciaria', this.selectedFiles['tertiary']);
    //}

    if (this.isEditing && this.selectedNoticiaId !== null) {
      this.noticiaService.updateNoticia(this.selectedNoticiaId, formData).subscribe({
        next: () => {
          this.toastrService.success('Notícia atualizada com sucesso!');
          this.loadNoticias();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao atualizar a notícia!');
        }
      });
    } else {
      this.noticiaService.createNoticia(formData).subscribe({
        next: () => {
          this.toastrService.success('Notícia adicionada com sucesso!');
          this.loadNoticias();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao adicionar a notícia!');
        }
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
          if (type === 'main' && !((width >= 360 && width <= 750) || (height >= 245 && height <= 645))) {
            this.imageErrors['main'] = 'A imagem principal precisa ter exatamente 750x645 pixels.';
            this.selectedFiles['main'] = null;
            //} else if (type === 'secondary' && (width !== 750 || height !== 375)) {
            //  this.imageErrors['secondary'] = 'A imagem secundária precisa ter exatamente 750x375 pixels.';
            //  this.selectedFiles['secondary'] = null;
            //} else if (type === 'tertiary' && (width !== 360 || height !== 245)) {
            //  this.imageErrors['tertiary'] = 'A imagem terciária precisa ter exatamente 360x245 pixels.';
            //  this.selectedFiles['tertiary'] = null;
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
    return !!this.imageErrors['main']; //|| !!this.imageErrors['secondary'] || !!this.imageErrors['tertiary'];
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
        this.noticiaService.deleteNoticia(id).subscribe({
          next: () => {

            Swal.fire('Excluído!', 'A noticía foi excluída com sucesso.', 'success');
            this.loadNoticias();
          },
          error: () => {
            Swal.fire('Erro!', 'Ocorreu um problema ao excluir a noticía.', 'error');
          }
        });
      }
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

    this.resetFileInputs();
  }

  processNoticias() {
    this.noticias = this.noticias.map((noticia) => ({
      ...noticia,
      categoriaNomes: noticia.categoria?.map((cat) => cat.nome).join(', ') || '',
    }));
  }

  resetFileInputs(): void {
    // Limpar os inputs de arquivos na tela
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input: any) => {
      input.value = '';  // Limpa o campo de arquivo
    });
  }

  onFilterChange(): void {
    this.page = 1;
    this.loadNoticias();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadNoticias();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
