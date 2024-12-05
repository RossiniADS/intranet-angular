import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit {

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
    { id: 'nav-home', title: 'Lifestyle', active: true },
    { id: 'nav-profile', title: 'Travel', active: false },
    { id: 'nav-contact', title: 'Fashion', active: false },
    { id: 'nav-last', title: 'Sports', active: false },
    { id: 'nav-nav-Sport', title: 'Technology', active: false }
  ];

  articles = [
    {
      img: 'assets/img/gallery/whats_news_details1.png',
      title: 'Secretart for Economic Air plane that looks like',
      author: 'Alice Cloe',
      date: 'Jun 19, 2020',
      description: 'Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.'
    }
  ];

  rightArticles = [
    {
      img: 'assets/img/gallery/whats_right_img1.png',
      category: 'FASHION',
      title: 'Portrait of group of friends ting eat. market in.',
      date: 'Jun 19, 2020'
    },
    // Outros artigos...
  ];

  mostRecent = [
    {
      img: 'assets/img/gallery/most_recent.png',
      category: 'Vogue',
      title: 'What to Wear: 9+ Cute Work Outfits to Wear This.',
      author: 'Jhon',
      time: '2 hours ago'
    },
    // Outros artigos recentes...
  ];

  //PARTE 3
  bannerImage: string = 'assets/img/gallery/body_card2.png';

  popularNews = [
    {
      img: 'assets/img/gallery/weeklyNews1.png',
      title: 'Scarlett’s disappointment at latest accolade',
      author: 'Jhon',
      time: '2 hours ago',
    },
    {
      img: 'assets/img/gallery/weeklyNews2.png',
      title: 'Scarlett’s disappointment at latest accolade',
      author: 'Jhon',
      time: '2 hours ago',
    },
    {
      img: 'assets/img/gallery/weeklyNews3.png',
      title: 'Scarlett’s disappointment at latest accolade',
      author: 'Jhon',
      time: '2 hours ago',
    },
    {
      img: 'assets/img/gallery/weeklyNews2.png',
      title: 'Scarlett’s disappointment at latest accolade',
      author: 'Jhon',
      time: '2 hours ago',
    },
  ];

  //PARTE 4
   sectionTitle = 'Trending News';

  articles2 = [
    {
      img: 'assets/img/gallery/tranding1.png',
      title: 'What to Expect From the 2020 Oscar Nominations',
      date: 'Jun 19, 2020',
      video: 'https://www.youtube.com/watch?v=1aP-TXUpNoU',
      link: 'latest_news.html'
    },
    {
      img: 'assets/img/gallery/tranding2.png',
      title: 'What to Expect From the 2020 Oscar Nominations',
      date: 'Jun 19, 2020',
      video: 'https://www.youtube.com/watch?v=1aP-TXUpNoU',
      link: 'latest_news.html'
    },
    {
      img: 'assets/img/gallery/tranding1.png',
      title: 'What to Expect From the 2020 Oscar Nominations',
      date: 'Jun 19, 2020',
      video: 'https://www.youtube.com/watch?v=1aP-TXUpNoU',
      link: 'latest_news.html'
    },
    {
      img: 'assets/img/gallery/tranding2.png',
      title: 'What to Expect From the 2020 Oscar Nominations',
      date: 'Jun 19, 2020',
      video: 'https://www.youtube.com/watch?v=1aP-TXUpNoU',
      link: 'latest_news.html'
    }
  ];
}
