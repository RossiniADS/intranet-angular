import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit {
  faPlay = faPlay;

  ngOnInit() {
    register()
  }

  ngAfterViewInit(): void {
    new Swiper('.mySwiper', {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        "type": "bullets",
        clickable: true,
      }
    });

    new Swiper('.mySwiper2', {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 3,
      pagination: {
        el: '.swiper-pagination',
        "type": "bullets",
        clickable: true,
      }
    });

    new Swiper('.mySwiper3', {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 3,
      pagination: {
        el: '.swiper-pagination',
        "type": "bullets",
        clickable: true,
      }
    });

    new Swiper('.mySwiper4', {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 3,
      pagination: {
        el: '.swiper-pagination',
        "type": "bullets",
        clickable: true,
      }
    });

    new Swiper('.mySwiper5', {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 4,
      pagination: {
        el: '.swiper-pagination',
        "type": "bullets",
        clickable: true,
      }
    });
  }

  //PARTE UM 
  trendingSlides = [
    {
      imageUrl: 'assets/img/trending/trending_top2.jpg',
      altText: 'Trending Slide 1',
      category: 'Business',
      title: 'Anna Lora Stuns In White At Her Australian Premiere',
      description: 'by Alice Cloe - Jun 19, 2020',
      link: '/latest-news',
    },
    {
      imageUrl: 'assets/img/trending/trending_top02.jpg',
      altText: 'Trending Slide 2',
      category: 'Business',
      title: 'Anna Lora Stuns In White At Her Australian Premiere',
      description: 'by Alice Cloe - Jun 19, 2020',
      link: '/latest-news',
    },
    {
      imageUrl: 'assets/img/trending/trending_top03.jpg',
      altText: 'Trending Slide 3',
      category: 'Business',
      title: 'Anna Lora Stuns In White At Her Australian Premiere',
      description: 'by Alice Cloe - Jun 19, 2020',
      link: '/latest-news',
    },
  ];

  trendingCards = [
    {
      imageUrl: 'assets/img/trending/trending_top3.jpg',
      altText: 'Trending Card 1',
      category: 'Fashion',
      categoryClass: 'bgb',
      title: 'Secretary for Economic Airplane that looks like',
      description: 'by Alice Cloe - Jun 19, 2020',
      link: '/latest-news',
    },
    {
      imageUrl: 'assets/img/trending/trending_top4.jpg',
      altText: 'Trending Card 2',
      category: 'Tech',
      categoryClass: 'bgg',
      title: 'Secretary for Economic Airplane that looks like',
      description: 'by Alice Cloe - Jun 19, 2020',
      link: '/latest-news',
    },
  ];

  //PARTE 2
  tabs = [
    { id: 'nav-home', label: 'Lifestyle', toggle: 'tab', href: '#nav-home', controls: 'nav-home', active: true },
    { id: 'nav-profile', label: 'Travel', toggle: 'tab', href: '#nav-profile', controls: 'nav-profile', active: false },
    { id: 'nav-contact', label: 'Fashion', toggle: 'tab', href: '#nav-contact', controls: 'nav-contact', active: false },
    { id: 'nav-last', label: 'Sports', toggle: 'tab', href: '#nav-last', controls: 'nav-last', active: false },
    { id: 'nav-nav-Sport', label: 'Technology', toggle: 'tab', href: '#nav-nav-Sport', controls: 'nav-nav-Sport', active: false }
  ];

  // Dados principais
  mainNews = {
    image: 'assets/img/gallery/whats_news_details1.png',
    title: 'Secretart for Economic Air plane that looks like',
    author: 'Alice cloe',
    date: 'Jun 19, 2020',
    description:
      'Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.',
  };

  // Lista de notícias secundárias
  rightNews = [
    {
      image: 'assets/img/gallery/whats_right_img1.png',
      category: 'FASHION',
      title: 'Portrait of group of friends ting eat. market in.',
      date: 'Jun 19, 2020',
      colorClass: 'colorb',
    },
    {
      image: 'assets/img/gallery/whats_right_img2.png',
      category: 'FASHION',
      title: 'Portrait of group of friends ting eat. market in.',
      date: 'Jun 19, 2020',
      colorClass: 'colorb',
    },
    {
      image: 'assets/img/gallery/whats_right_img3.png',
      category: 'FASHION',
      title: 'Portrait of group of friends ting eat. market in.',
      date: 'Jun 19, 2020',
      colorClass: 'colorg',
    },
    {
      image: 'assets/img/gallery/whats_right_img4.png',
      category: 'FASHION',
      title: 'Portrait of group of friends ting eat. market in.',
      date: 'Jun 19, 2020',
      colorClass: 'colorr',
    },
  ];

  //Banner
  bannerImage2 = 'assets/img/gallery/body_card1.png';

  // Redes sociais
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

  // Notícias mais recentes
  mostRecentNews = [
    {
      image: 'assets/img/gallery/most_recent.png',
      category: 'Vogue',
      title: 'What to Wear: 9+ Cute Work Outfits to Wear This.',
      time: 'Jhon | 2 hours ago',
      link: 'latest_news.html',
    },
    {
      image: 'assets/img/gallery/most_recent1.png',
      title: 'Scarlett’s disappointment at latest accolade',
      time: 'Jhon | 2 hours ago',
      link: 'latest_news.html',
    },
    {
      image: 'assets/img/gallery/most_recent2.png',
      title: 'Most Beautiful Things to Do in Sidney with Your BF',
      time: 'Jhon | 3 hours ago',
      link: 'latest_news.html',
    },
  ];
  //PARTE 3
  bannerImage: string = 'assets/img/gallery/body_card2.png';

  popularNews = [
    {
      imageUrl: 'assets/img/gallery/weeklyNews1.png',
      altText: 'Weekly News 1',
      category: 'News',
      title: "Scarlett’s disappointment at latest accolade",
      description: 'Jhon | 2 hours ago',
      link: '/news/1',
    },
    {
      imageUrl: 'assets/img/gallery/weeklyNews2.png',
      altText: 'Weekly News 2',
      category: 'News',
      title: "Scarlett’s disappointment at latest accolade",
      description: 'Jhon | 3 hours ago',
      link: '/news/2',
    },
    {
      imageUrl: 'assets/img/gallery/weeklyNews3.png',
      altText: 'Weekly News 3',
      category: 'News',
      title: "Scarlett’s disappointment at latest accolade",
      description: 'Jhon | 4 hours ago',
      link: '/news/3',
    },
    {
      imageUrl: 'assets/img/gallery/weeklyNews3.png',
      altText: 'Weekly News 3',
      category: 'News',
      title: "Scarlett’s disappointment at latest accolade",
      description: 'Jhon | 4 hours ago',
      link: '/news/3',
    },
  ];

  //PARTE 4
  sectionTitle = 'Trending News';

  articles2 = [
    {
      imageUrl: 'assets/img/gallery/tranding1.png',
      altText: 'Trending Image 1',
      title: 'What to Expect From the 2020 Oscar Nominations',
      description: 'Jun 19, 2020',
      category: 'Entertainment',
      link: '/latest-news',
      videoLink: 'https://www.youtube.com/watch?v=1aP-TXUpNoU',
    },
    {
      imageUrl: 'assets/img/gallery/tranding2.png',
      altText: 'Trending Image 2',
      title: 'Another Big Event on the Horizon',
      description: 'Jul 10, 2020',
      category: 'Lifestyle',
      link: '/latest-news',
      videoLink: 'https://www.youtube.com/watch?v=2bP-TXUpNoV',
    },
    {
      imageUrl: 'assets/img/gallery/tranding1.png',
      altText: 'Trending Image 1',
      title: 'What to Expect From the 2020 Oscar Nominations',
      description: 'Jun 19, 2020',
      category: 'Entertainment',
      link: '/latest-news',
      videoLink: 'https://www.youtube.com/watch?v=1aP-TXUpNoU',
    },
    {
      imageUrl: 'assets/img/gallery/tranding2.png',
      altText: 'Trending Image 2',
      title: 'Another Big Event on the Horizon',
      description: 'Jul 10, 2020',
      category: 'Lifestyle',
      link: '/latest-news',
      videoLink: 'https://www.youtube.com/watch?v=2bP-TXUpNoV',
    },
    {
      imageUrl: 'assets/img/gallery/tranding2.png',
      altText: 'Trending Image 2',
      title: 'Another Big Event on the Horizon',
      description: 'Jul 10, 2020',
      category: 'Lifestyle',
      link: '/latest-news',
      videoLink: 'https://www.youtube.com/watch?v=2bP-TXUpNoV',
    }
  ];

  //PARTE 5

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

  //PARTE 6
  weeklyNews = [
    {
      imgSrc: 'assets/img/gallery/weekly2News1.png',
      title: 'What to Expect From the 2020 Oscar Nominations',
      date: '19 Jan 2020',
      link: '/latest-news',
      category: 'Entertainment'
    },
    {
      imgSrc: 'assets/img/gallery/weekly2News2.png',
      title: 'What to Expect From the 2020 Oscar Nominations',
      date: '19 Jan 2020',
      link: '/latest-news',
      category: 'Entertainment'
    },
    {
      imgSrc: 'assets/img/gallery/weekly2News3.png',
      title: 'What to Expect From the 2020 Oscar Nominations',
      date: '19 Jan 2020',
      link: '/latest-news',
      category: 'Entertainment'
    },
    {
      imgSrc: 'assets/img/gallery/weekly2News4.png',
      title: 'What to Expect From the 2020 Oscar Nominations',
      date: '19 Jan 2020',
      link: '/latest-news',
      category: 'Entertainment'
    },
    {
      imgSrc: 'assets/img/gallery/weekly2News1.png',
      title: 'What to Expect From the 2020 Oscar Nominations',
      date: '19 Jan 2020',
      link: '/latest-news',
      category: 'Entertainment'
    }
  ];
}
