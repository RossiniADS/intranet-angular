import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: false,

  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  currentPage = 1;
  totalPages = Array(2).fill(0).map((_, i) => i + 1); // Array de páginas [1, 2]
  searchKeyword = ''; // Palavra-chave para pesquisa
  subscribeEmail = ''; // Email para inscrição

  // Dados principais
  blogItems = [
    {
      imgSrc: 'assets/img/blog/single_blog_1.png',
      date: { day: '15', month: 'Jan' },
      title: 'Google inks pact for new 35-storey office',
      description:
        "That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.",
      infoLinks: [
        { icon: 'fa fa-user', text: 'Travel, Lifestyle' },
        { icon: 'fa fa-comments', text: '03 Comments' }
      ],
      link: ''
    },
    {
      imgSrc: 'assets/img/blog/single_blog_2.png',
      date: { day: '15', month: 'Jan' },
      title: 'Google inks pact for new 35-storey office',
      description:
        "That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.",
      infoLinks: [
        { icon: 'fa fa-user', text: 'Travel, Lifestyle' },
        { icon: 'fa fa-comments', text: '03 Comments' }
      ],
      link: ''
    },
    {
      imgSrc: 'assets/img/blog/single_blog_3.png',
      date: { day: '15', month: 'Jan' },
      title: 'Google inks pact for new 35-storey office',
      description:
        "That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.",
      infoLinks: [
        { icon: 'fa fa-user', text: 'Travel, Lifestyle' },
        { icon: 'fa fa-comments', text: '03 Comments' }
      ],
      link: ''
    },
    {
      imgSrc: 'assets/img/blog/single_blog_4.png',
      date: { day: '15', month: 'Jan' },
      title: 'Google inks pact for new 35-storey office',
      description:
        "That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.",
      infoLinks: [
        { icon: 'fa fa-user', text: 'Travel, Lifestyle' },
        { icon: 'fa fa-comments', text: '03 Comments' }
      ],
      link: ''
    },
    {
      imgSrc: 'assets/img/blog/single_blog_5.png',
      date: { day: '15', month: 'Jan' },
      title: 'Google inks pact for new 35-storey office',
      description:
        "That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.",
      infoLinks: [
        { icon: 'fa fa-user', text: 'Travel, Lifestyle' },
        { icon: 'fa fa-comments', text: '03 Comments' }
      ],
      link: ''
    }
  ];

  // Paginação
  pagination = {
    previous: { icon: 'ti-angle-left', href: '#' },
    pages: [
      { number: 1, active: false, href: '#' },
      { number: 2, active: true, href: '#' }
    ],
    next: { icon: 'ti-angle-right', href: '#' }
  };

  // Barra lateral direita
  searchWidget = {
    placeholder: 'Search Keyword',
    buttonIcon: 'fa-solid fa-magnifying-glass',
    submitButtonText: 'Search'
  };

  categories = [
    { name: 'Resaurant food', count: 37 },
    { name: 'Travel news', count: 10 },
    { name: 'Modern technology', count: 3 },
    { name: 'Product', count: 11 },
    { name: 'Inspiration', count: 21 },
    { name: 'Health Care (21)', count: 9 }
  ];

  recentPosts = [
    { imgSrc: 'assets/img/post/post_1.png', title: 'From life was you fish...', date: 'January 12, 2019', link: '' },
    { imgSrc: 'assets/img/post/post_2.png', title: 'The Amazing Hubble', date: '02 Hours ago', link: '' },
    { imgSrc: 'assets/img/post/post_3.png', title: 'Astronomy Or Astrology', date: '03 Hours ago', link: '' },
    { imgSrc: 'assets/img/post/post_4.png', title: 'Asteroids telescope', date: '01 Hours ago', link: '' }
  ];

  tagClouds = ['project', 'love', 'technology', 'travel', 'restaurant', 'life style', 'design', 'illustration'];

  instagramFeeds = [
    'assets/img/post/post_5.png',
    'assets/img/post/post_6.png',
    'assets/img/post/post_7.png',
    'assets/img/post/post_8.png',
    'assets/img/post/post_9.png',
    'assets/img/post/post_10.png'
  ];

  newsletter = {
    placeholder: 'Enter email',
    submitButtonText: 'Subscribe'
  };

  // Funções de navegação
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
    }
  }

  // Funções de interação
  onSearch(string: string): void {
    console.log('Searching for:', this.searchKeyword);
  }

  onSubscribe(email: string): void {
    console.log('Subscribed with email:', this.subscribeEmail);
  }

}
