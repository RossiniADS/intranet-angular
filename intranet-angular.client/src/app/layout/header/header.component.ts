import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  trendingTitle = 'trending-title';
  trendingDescription = 'Class property employ ancho red multi level mansion';
  contactNumber = '+880166 253 232';

  logoLink = 'index.html';
  logoSrc = 'assets/img/logo/logo.png';
  logoAlt = 'Company Logo';

  headerBannerSrc = 'assets/img/gallery/header_card.png';
  headerBannerAlt = 'Header Banner';

  menuItems = [
    { label: 'Home', link: 'index.html' },
    { label: 'About', link: 'about.html' },
    { label: 'Category', link: 'categori.html' },
    { label: 'Latest News', link: 'latest_news.html' },
    {
      label: 'Pages',
      link: '#',
      submenu: [
        { label: 'Blog', link: 'blog.html' },
        { label: 'Blog Details', link: 'blog_details.html' },
        { label: 'Element', link: 'elements.html' }
      ]
    },
    { label: 'Contact', link: 'contact.html' }
  ];

  socialLinks = [
    { link: 'https://www.fb.com/sai4ull', icon: 'fab fa-facebook-f' },
    { link: '#', icon: 'fab fa-twitter' },
    { link: '#', icon: 'fab fa-instagram' },
    { link: '#', icon: 'fab fa-youtube' }
  ];
}
