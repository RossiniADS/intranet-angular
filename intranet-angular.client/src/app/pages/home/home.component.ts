import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { NoticiaService } from '../../service/noticia.service';
import { SlideService } from '../../service/slides.service';
import { GrupoDeSlidesService } from '../../service/grupo.de.slides.service';
import { NoticiaResponse } from '../../../response/noticiaResponse';
import { CategoriaResponse } from '../../../response/categoriaResponse';
import { CategoriaService } from '../../service/categoria.service';
import { environment } from '../../../environments/environment';
import { MidiaTamanhoEnum } from '../../enum/midia-tamanho.enum';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit {
  faPlay = faPlay;
  trendingSlides: any[] = [
    {
      imageUrl: '',
      altText: '',
      category: '',
      title: '',
      description: '',
      link: '',
    },
  ];
  trendingCards: any[] = [
    {
      imageUrl: '',
      altText: '',
      category: '',
      categoryClass: '',
      title: '',
      description: '',
      link: '',
    },
  ];
  tabs: any[] = [
    {
      id: '',
      label: '',
      toggle: '',
      href: '',
      controls: '',
      active: false,
    },
  ];
  mostRecentNews: any[] = [
    {
      image: '',
      category: '',
      title: '',
      time: '',
      link: '',
    },
  ];
  mainNews: any = {
    image: '',
    title: '',
    author: '',
    date: '',
    description: '',
    link: '',
  };
  rightNews: any[] = [
    {
      image: '',
      category: '',
      title: '',
      date: '',
      colorClass: '',
      link: '',
    },
  ];
  noticiasResponse: NoticiaResponse[] = [
    {
      id: 0,
      titulo: '',
      descricao: '',
      conteudo: '',
      autorId: 0,
      midiaNoticia: [{
        id: 0,
        midiaTamanho: 0,
        noticiaId: 0,
        tipo: 0,
        url: ''
      }],
      dataPublicacao: new Date(),
      categoria: [{ id: 0, nome: '', qtdNoticia: 0 }],
      isTrendingTop: false,
    },
  ];
  categoriaResponse: CategoriaResponse[] = [
    {
      id: 0,
      nome: '',
      qtdNoticia: 0
    },
  ];

  pageIdHome = 1;
  currentIndex = 0;

  constructor(
    private noticiaService: NoticiaService,
    private slideService: SlideService,
    private grupoDeSlideService: GrupoDeSlidesService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    register();
    this.loadTrendingSlides();
    this.loadCategorias();
  }

  private loadNoticias(): void {
    this.noticiaService.getNoticias().subscribe({
      next: (data) => {
        this.noticiasResponse = data
        this.loadMainAndRightNews(this.categoriaResponse[0].id)
        this.loadTrendingTops()
        this.loadMostRecentNews();
      },
      error: (err) => console.error('Erro ao carregar notícias:', err),
    });
  }

  private loadCategorias(): void {
    this.categoriaService.getAll().subscribe({
      next: (data) => {
        this.categoriaResponse = data
        this.loadNoticias(); // Noticias aqui pois uma das dependencias irá precisar da categoria
        this.loadTabs()
      },
      error: (err) => console.error('Erro ao carregar categorias:', err),
    });
  }

  private loadTrendingSlides(): void {
    this.grupoDeSlideService.getByPageId(this.pageIdHome).subscribe({
      next: (grupos) => {
        const slides = grupos[0]?.slides || [];
        this.trendingSlides = slides.map((slide) => ({
          imageUrl: `${environment.serverUrl}${slide.url}`,
          altText: 'Slide',
          category: slide.principalCategoriaNome,
          title: slide.titulo,
          description: slide.descricao,
          link: `/noticia/${slide.noticiaId}`,
        }));
      },
      error: (err) => console.error('Erro ao carregar slides:', err),
    });
  }

  private loadTrendingTops(): void {
    if (!this.noticiasResponse.length) return;
    this.trendingCards = this.noticiasResponse
      .filter((n) => n.isTrendingTop)
      .sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime())
      .slice(0, 2)
      .map((noticia) => ({
        imageUrl: `${environment.serverUrl}${noticia.midiaNoticia.filter(midia => midia.midiaTamanho == MidiaTamanhoEnum.Principal)[0]?.url || ''}`,
        altText: 'Trending Card',
        category: noticia.categoria[0]?.nome || 'Sem Categoria',
        categoryClass: 'bgb',
        title: noticia.titulo,
        description: `by Rossini Alves - ${noticia.dataPublicacao}`,
        link: `/noticia/${noticia.id}`,
      }));
  }

  private loadTabs(): void {
    this.tabs = this.categoriaResponse.map((cat, index) => ({
      id: `${cat.id}`,
      label: cat.nome,
      toggle: 'tab',
      href: `#nav-${cat.nome}`,
      controls: `nav-${cat.nome}`,
      active: index === 0,
    }));
  }

  loadMainAndRightNews(categoriaId: number): void {
    const noticiasFiltradas = this.noticiasResponse.filter((not) =>
      not.categoria.some((cat) => cat.id === categoriaId)
    );

    if (!noticiasFiltradas.length) {
      console.warn('Nenhuma notícia encontrada para a categoria especificada.');
      return;
    }

    const ultimaNoticia = noticiasFiltradas.reduce((maisAtual, atual) =>
      new Date(atual.dataPublicacao) > new Date(maisAtual.dataPublicacao)
        ? atual
        : maisAtual
    );

    this.mainNews = {
      image: `${environment.serverUrl}${ultimaNoticia.midiaNoticia.filter(midia => midia.midiaTamanho == MidiaTamanhoEnum.Terciaria)[0].url}`,
      title: ultimaNoticia.titulo,
      author: ultimaNoticia.autorId,
      date: ultimaNoticia.dataPublicacao,
      description: ultimaNoticia.descricao,
      link: `/noticia/${ultimaNoticia.id}`,
    };

    this.rightNews = noticiasFiltradas
      .filter((not) => not !== ultimaNoticia)
      .map((not) => ({
        image: `${environment.serverUrl}${not.midiaNoticia.filter(midia => midia.midiaTamanho == MidiaTamanhoEnum.Terciaria)[0].url}`,
        category: not.categoria[0]?.nome || 'Sem Categoria',
        title: not.titulo,
        date: not.dataPublicacao,
        colorClass: 'colorb',
        link: `/noticia/${not.id}`,
      }));
  }

  private loadMostRecentNews(): void {
    this.mostRecentNews = this.noticiasResponse.map((noticia) => ({
      image: `${environment.serverUrl}${noticia.midiaNoticia.filter(midia => midia.midiaTamanho == MidiaTamanhoEnum.Terciaria)[0].url}`,
      category: noticia.categoria[0]?.nome || 'Sem Categoria',
      title: noticia.titulo,
      time: `${noticia.autorId} | ${noticia.dataPublicacao}`,
      link: `/noticia/${noticia.id}`,
    }));
  }

  ngAfterViewInit(): void {
    this.initializeSwiper('.mySwiper', 1);
    this.initializeSwiper('.mySwiper2', 3);
    this.initializeSwiper('.mySwiper3', 3);
    this.initializeSwiper('.mySwiper4', 3);
    this.initializeSwiper('.mySwiper5', 4);
  }

  private initializeSwiper(selector: string, slidesPerView: number): void {
    new Swiper(selector, {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }

  slides = [
    {
      type: 'image',
      src: 'https://via.placeholder.com/600x400',
      title: 'Imagem 1',
      description: 'Descrição para a imagem 1.',
    },
    {
      type: 'video',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: 'Vídeo 1',
      description: 'Descrição para o vídeo 1.',
    },
    {
      type: 'image',
      src: 'https://via.placeholder.com/600x400?text=Slide+2',
      title: 'Imagem 2',
      description: 'Descrição para a imagem 2.',
    },
  ];

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  videos = [
    { src: 'assets/video/news2.mp4', title: 'Old Spondon News - 2020' },
    { src: 'assets/video/news1.mp4', title: 'Banglades News Video' },
    { src: 'assets/video/news3.mp4', title: 'Latest Video - 2020' },
    { src: 'assets/video/news1.mp4', title: 'Spondon News - 2019' },
    { src: 'assets/video/news3.mp4', title: 'Latest Video - 2020' },
  ];

  selectedVideo = this.videos[0];

  selectVideo(video: { src: string; title: string }): void {
    this.selectedVideo = video;
    const videoElement = this.videoPlayer.nativeElement;

    // Atualiza a fonte do vídeo
    videoElement.pause(); // Pausa o vídeo atual
    videoElement.src = video.src; // Atualiza a URL do vídeo
    videoElement.load(); // Recarrega o vídeo
    videoElement.play(); // Opcional: inicia o vídeo automaticamente
  }

  onTabClick(tab: any): void {
    // Atualizar o estado ativo das abas
    this.tabs.forEach(t => t.active = false);
    tab.active = true;

    if (tab.id) {
      this.loadMainAndRightNews(Number(tab.id));
    }
  }

  socialMedia = [
    {
      icon: 'assets/img/news/icon-fb.png',
      fans: 8045,
      platform: 'Fans',
      link: '#',
    },
    {
      icon: 'assets/img/news/icon-tw.png',
      fans: 8045,
      platform: 'Fans',
      link: '#',
    },
    {
      icon: 'assets/img/news/icon-ins.png',
      fans: 8045,
      platform: 'Fans',
      link: '#',
    },
    {
      icon: 'assets/img/news/icon-yo.png',
      fans: 8045,
      platform: 'Fans',
      link: '#',
    },
  ];

  bannerImage2 = 'assets/img/gallery/body_card1.png';

  bannerImage: string = 'assets/img/gallery/body_card2.png';
}
