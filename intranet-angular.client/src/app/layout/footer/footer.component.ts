import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear(); // Obtém o ano atual automaticamente
  footerData = {
    logoSrc: 'assets/img/logo/logo2_footer.png',
    logoAlt: 'Logo',
    description: 'Lorem ipsum dolor sit amet, nsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    address: '198 West 21th Street, Suite 721 New York,NY 10010',
    contact: 'Phone: +95 (0) 123 456 789 Cell: +95 (0) 123 456 789',
    popularPostTitle: 'Popular post',
    popularPosts: [
      {
        imgSrc: 'assets/img/gallery/footer_post1.png',
        imgAlt: 'Post 1',
        link: 'latest_news.html',
        title: 'Scarlett’s disappointment at latest accolade',
        author: 'Jhon',
        time: '2 hours ago'
      },
      {
        imgSrc: 'assets/img/gallery/footer_post2.png',
        imgAlt: 'Post 2',
        link: 'latest_news.html',
        title: 'Scarlett’s disappointment at latest accolade',
        author: 'Jhon',
        time: '2 hours ago'
      },
      {
        imgSrc: 'assets/img/gallery/footer_post3.png',
        imgAlt: 'Post 3',
        link: 'latest_news.html',
        title: 'Scarlett’s disappointment at latest accolade',
        author: 'Jhon',
        time: '2 hours ago'
      }
    ],
    bannerSrc: 'assets/img/gallery/body_card4.png',
    bannerAlt: 'Banner',
    footerNote: 'This template is made with ❤️ by Colorlib'
  };
}
