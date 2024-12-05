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
    info: {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      address: '198 West 21th Street, Suite 721 New York, NY 10010',
      phone: 'Phone: +95 (0) 123 456 789 Cell: +95 (0) 123 456 789'
    },
    posts: [
      {
        imgSrc: 'assets/img/gallery/footer_post1.png',
        title: 'Scarlett’s disappointment at latest accolade',
        link: 'latest_news.html',
        author: 'John',
        time: '2 hours ago'
      },
      {
        imgSrc: 'assets/img/gallery/footer_post2.png',
        title: 'Scarlett’s disappointment at latest accolade',
        link: 'latest_news.html',
        author: 'John',
        time: '2 hours ago'
      },
      {
        imgSrc: 'assets/img/gallery/footer_post3.png',
        title: 'Scarlett’s disappointment at latest accolade',
        link: 'latest_news.html',
        author: 'John',
        time: '2 hours ago'
      }
    ],
    bannerImgSrc: 'assets/img/gallery/body_card4.png',
    copyright: {
      text: 'All rights reserved | This template is made with ',
      link: 'https://colorlib.com',
      linkText: 'Colorlib'
    }
  };
}
