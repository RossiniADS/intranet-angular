import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { NoticiaService } from '../../service/noticia.service';
import { GrupoDeSlidesService } from '../../service/grupo.de.slides.service';
import { NoticiaResponse } from '../../../response/noticiaResponse';
import { CategoriaResponse } from '../../../response/categoriaResponse';
import { CategoriaService } from '../../service/categoria.service';
import { environment } from '../../../environments/environment';
import { MidiaTamanhoEnum } from '../../enum/midia-tamanho.enum';
import { formatDate } from '@angular/common';

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
  slides = [
    {
      type: 0,
      src: '',
      title: '',
      description: '',
    }
  ];
  pageIdHome = 2;
  currentIndex = 0;
  videos: any[] = [
    {
      src: '',
      title: ''
    },
  ];
  selectedVideo = this.videos[0];
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
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChildren('carouselVideo') carouselVideos!: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(
    private noticiaService: NoticiaService,
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
        const primeiroSlide = grupos.find(gr => gr.posicao === 1)?.slides || [];
        const segundoSlide = grupos.find(gr => gr.posicao === 2)?.slides || [];
        const terceiroSlide = grupos.find(gr => gr.posicao === 3)?.slides || [];

        this.slides = primeiroSlide.map((slide) => ({
          type: slide.tipo,
          src: `${environment.serverUrl}${slide.url}`,
          title: slide.titulo,
          description: slide.descricao,
        }))

        this.trendingSlides = segundoSlide.map((slide) => ({
          imageUrl: `${environment.serverUrl}${slide.url}`,
          altText: 'Slide',
          category: slide.principalCategoriaNome,
          title: slide.titulo,
          description: slide.descricao,
          link: `/noticia/${slide.noticiaId}`,
        }));

        this.videos = terceiroSlide.map((video) => ({
          src: `${environment.serverUrl}${video.url}`,
          title: video.titulo
        }))
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
        description: `by Rossini Alves - ${formatDate(noticia.dataPublicacao, 'dd/MM/yyyy', 'pt-BR')}`,
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

  private loadMainAndRightNews(categoriaId: number): void {
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
      image: `${environment.serverUrl}${ultimaNoticia.midiaNoticia.filter(midia => midia.midiaTamanho == MidiaTamanhoEnum.Principal)[0].url}`,
      title: ultimaNoticia.titulo,
      author: ultimaNoticia.autorId,
      date: ultimaNoticia.dataPublicacao,
      description: ultimaNoticia.descricao,
      link: `/noticia/${ultimaNoticia.id}`,
    };

    this.rightNews = noticiasFiltradas
      .filter((not) => not !== ultimaNoticia)
      .map((not) => ({
        image: `${environment.serverUrl}${not.midiaNoticia.filter(midia => midia.midiaTamanho == MidiaTamanhoEnum.Principal)[0].url}`,
        category: not.categoria[0]?.nome || 'Sem Categoria',
        title: not.titulo,
        date: not.dataPublicacao,
        colorClass: 'colorb',
        link: `/noticia/${not.id}`,
      }));
  }

  private loadMostRecentNews(): void {
    this.mostRecentNews = this.noticiasResponse.map((noticia) => ({
      image: `${environment.serverUrl}${noticia.midiaNoticia.filter(midia => midia.midiaTamanho == MidiaTamanhoEnum.Principal)[0].url}`,
      category: noticia.categoria[0]?.nome || 'Sem Categoria',
      title: noticia.titulo,
      time: `${noticia.autorId} | ${formatDate(noticia.dataPublicacao, 'dd/MM/yyyy', 'pt-BR')}`,
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

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  selectVideo(video: { src: string; title: string }): void {
    // Atualiza o vídeo principal
    this.selectedVideo = video;
    const videoElement = this.videoPlayer.nativeElement;

    videoElement.pause(); // Pausa o vídeo atual
    videoElement.src = video.src; // Atualiza a URL do vídeo
    videoElement.load(); // Recarrega o vídeo
    videoElement.play(); // Opcional: inicia o vídeo automaticamente

    // Pausa todos os vídeos do carrossel
    this.carouselVideos.forEach((carouselVideo) => {
      const videoEl = carouselVideo.nativeElement;
      videoEl.pause(); // Pausa qualquer reprodução no carrossel
    });
  }
  onTabClick(tab: any): void {
    // Atualizar o estado ativo das abas
    this.tabs.forEach(t => t.active = false);
    tab.active = true;

    if (tab.id) {
      this.loadMainAndRightNews(Number(tab.id));
    }
  }
}
