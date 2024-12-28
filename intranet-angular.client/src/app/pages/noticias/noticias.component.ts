import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../service/noticia.service';
import { CategoriaService } from '../../service/categoria.service';
import { DatePipe } from '@angular/common';
import { NoticiaResponse } from '../../../response/noticiaResponse';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-noticias',
  standalone: false,

  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent implements OnInit {
  noticiasItems: any[] = [
    {
      imgSrc: '',
      date: { day: '', month: '' },
      title: '',
      description: "",
      infoLinks: [
        { icon: '', text: '' },
      ],
      link: ''
    }
  ];
  categories = [
    { name: '', count: 0 },
  ];
  recentPosts = [
    {
      imgSrc: '',
      title: '',
      date: '',
      link: ''
    },
  ];
  pageSize = 5;
  totalRecords = 0;
  pages: number[] = [];

  constructor(private noticiaService: NoticiaService, private categoriaService: CategoriaService, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.fetchNoticias();

    this.categoriaService.getQtdNoticiaPorCategoria().subscribe((data) => {
      this.categories = data.map((categoria) => ({
        name: categoria.nome,
        count: categoria.qtdNoticia
      }));
    });
  }

  fetchNoticias(): void {
    this.noticiaService.getNoticiasPaginadas(this.currentPage, this.pageSize).subscribe((data) => {
      this.loadMostRecentNews(data.data);

      this.totalRecords = data.totalRecords;
      this.pages = Array(Math.ceil(this.totalRecords / this.pageSize))
        .fill(0)
        .map((_, i) => i + 1); // Cria o array [1, 2, 3, ...]
      this.noticiasItems = data.data.map((noticia) => ({
        imgSrc: `${environment.serverUrl}${noticia.midiaUrl}`,
        date: {
          day: this.datePipe.transform(noticia.dataPublicacao, 'd') || '',
          month: this.datePipe.transform(noticia.dataPublicacao, 'MMM') || '',
        },
        title: noticia.titulo,
        description: noticia.descricao,
        infoLinks: [
          { icon: 'fa fa-user', text: noticia.autorId + ', ' + noticia.categoria[0].nome },
        ],
        link: '/noticia/id=' + noticia.id
      }));
    });
  }

  private loadMostRecentNews(noticiasResponse: NoticiaResponse[]): void {
    this.recentPosts = noticiasResponse.map((noticia) => ({
      imgSrc: `${environment.serverUrl}${noticia.midiaUrl}`,
      title: noticia.titulo,
      date: noticia.dataPublicacao.toString(),
      link: `/noticia/${noticia.id}`,
    }));
  }

  currentPage = 1;
  totalPages = Array(2).fill(0).map((_, i) => i + 1); // Array de páginas [1, 2]
  searchKeyword = ''; // Palavra-chave para pesquisa
  subscribeEmail = ''; // Email para inscrição

  pagination = {
    previous: { icon: 'ti-angle-left', href: '#' },
    pages: [
      { number: 1, active: false, href: '#' },
      { number: 2, active: true, href: '#' }
    ],
    next: { icon: 'ti-angle-right', href: '#' }
  };

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchNoticias();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.fetchNoticias();
  }

  nextPage(): void {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.fetchNoticias();
    }
  }

  // Barra lateral direita
  searchWidget = {
    placeholder: 'Search Keyword',
    buttonIcon: 'fa-solid fa-magnifying-glass',
    submitButtonText: 'Search'
  };

  newsletter = {
    placeholder: 'Enter email',
    submitButtonText: 'Subscribe'
  };

  // Funções de interação
  onSearch(string: string): void {
    console.log('Searching for:', this.searchKeyword);
  }

  onSubscribe(email: string): void {
    console.log('Subscribed with email:', this.subscribeEmail);
  }

}
