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
        delay: 5000,
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

  banner = {
    imgSrc: 'assets/images/banner.jpg', // Substitua pelo caminho correto
    altText: 'Descrição do banner'
  };

  // Links sociais
  socialLinks = [
    { altText: 'Facebook', link: 'https://facebook.com', icon: 'fa-facebook', label: 'Facebook', count: 100 },
    { altText: 'Twitter', link: 'https://twitter.com', icon: 'fa-twitter', label: 'Twitter', count: 100 },
    { altText: 'Instagram', link: 'https://instagram.com', icon: 'fa-instagram', label: 'Instagram', count: 100 }
  ];

  mostRecent = {
    featured: {
      imgSrc: 'assets/images/featured.jpg', // Substitua pelo caminho correto
      altText: 'Descrição da imagem em destaque',
      label: 'Destaque',
      labelClass: 'label-class',
      link: '/destaque',
      title: 'Título do destaque',
      author: 'Autor do artigo',
      timeAgo: '2 horas atrás'
    },
    items: [
      {
        imgSrc: 'assets/images/item1.jpg',
        altText: 'Descrição do item 1',
        link: '/item1',
        title: 'Título do item 1',
        author: 'Autor do item 1',
        timeAgo: '1 hora atrás'
      },
      {
        imgSrc: 'assets/images/item2.jpg',
        altText: 'Descrição do item 2',
        link: '/item2',
        title: 'Título do item 2',
        author: 'Autor do item 2',
        timeAgo: '3 horas atrás'
      }
    ]
  };

  trendingSlides = [
    {
      img: 'assets/img/trending/trending_top2.jpg',
      category: 'Business',
      title: 'Anna Lora Stuns In White At Her Australian Premiere',
      author: 'Alice Cloe',
      date: 'Jun 19, 2020',
      link: '/latest-news/1'
    },
    {
      img: 'assets/img/trending/trending_top02.jpg',
      category: 'Business',
      title: 'Anna Lora Stuns In White At Her Australian Premiere',
      author: 'Alice Cloe',
      date: 'Jun 19, 2020',
      link: '/latest-news/2'
    },
    {
      img: 'assets/img/trending/trending_top03.jpg',
      category: 'Business',
      title: 'Anna Lora Stuns In White At Her Australian Premiere',
      author: 'Alice Cloe',
      date: 'Jun 19, 2020',
      link: '/latest-news/3'
    }
  ];

  trendingCards = [
    {
      img: 'assets/img/trending/trending_top3.jpg',
      category: 'Fashion',
      title: 'Secretary for Economic Airplane that looks like',
      author: 'Alice Cloe',
      date: 'Jun 19, 2020',
      link: '/latest-news/4'
    },
    {
      img: 'assets/img/trending/trending_top4.jpg',
      category: 'Tech',
      title: 'Secretary for Economic Airplane that looks like',
      author: 'Alice Cloe',
      date: 'Jun 19, 2020',
      link: '/latest-news/5'
    }
  ];

  tabs = [
    {
      label: 'Lifestyle',
      content: [
        {
          main: true,
          image: 'assets/img/gallery/whats_news_details1.png',
          title: 'Secretary for Economic Airplane that looks like',
          link: 'latest_news.html',
          author: 'Alice Cloe',
          date: 'Jun 19, 2020',
          description:
            'Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.',
          sideNews: [
            {
              image: 'assets/img/gallery/whats_right_img1.png',
              category: 'FASHION',
              title: 'Portrait of group of friends ting eat. market in.',
              link: 'latest_news.html',
              date: 'Jun 19, 2020'
            },
            {
              image: 'assets/img/gallery/whats_right_img2.png',
              category: 'FASHION',
              title: 'Portrait of group of friends ting eat. market in.',
              link: 'latest_news.html',
              date: 'Jun 19, 2020'
            }
          ]
        }
      ]
    },
    {
      label: 'Travel',
      content: [
        {
          main: true,
          image: 'assets/img/gallery/whats_right_img2.png',
          title: 'Secretary for Economic Airplane that looks like',
          link: '#',
          author: 'Alice Cloe',
          date: 'Jun 19, 2020',
          description:
            'Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.',
          sideNews: []
        }
      ]
    }
  ];

  items = [
    {
      imgSrc: 'assets/img/gallery/whats_right_img1.png',
      altText: 'Imagem 1',
      label: 'FASHION',
      labelClass: 'colorb',
      title: 'Portrait of group of friends ting eat. market in.',
      link: '/latest-news',
      date: 'Jun 19, 2020',
    },
    {
      imgSrc: 'assets/img/gallery/whats_right_img2.png',
      altText: 'Imagem 2',
      label: 'FASHION',
      labelClass: 'colorb',
      title: 'Portrait of group of friends ting eat. market in.',
      link: '/latest-news',
      date: 'Jun 19, 2020',
    },
    {
      imgSrc: 'assets/img/gallery/whats_right_img3.png',
      altText: 'Imagem 3',
      label: 'FASHION',
      labelClass: 'colorg',
      title: 'Portrait of group of friends ting eat. market in.',
      link: '/latest-news',
      date: 'Jun 19, 2020',
    },
    {
      imgSrc: 'assets/img/gallery/whats_right_img4.png',
      altText: 'Imagem 4',
      label: 'FASHION',
      labelClass: 'colorr',
      title: 'Portrait of group of friends ting eat. market in.',
      link: '/latest-news',
      date: 'Jun 19, 2020',
    },
  ];


}
