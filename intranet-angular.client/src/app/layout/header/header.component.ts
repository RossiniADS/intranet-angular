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
    { label: 'Home', link: '' },
    { label: 'About', link: '/about' },
    { label: 'Category', link: '/category' },
    { label: 'Latest News', link: '/latest-news' },
    {
      label: 'Pages',
      link: '#',
      submenu: [
        { label: 'Blog', link: '/blog' },
        { label: 'Blog Details', link: '/blog-details' },
        { label: 'Element', link: '/element' }
      ]
    },
    { label: 'Contact', link: '/contact' }
  ];

  socialLinks = [
    { link: 'https://www.fb.com/sai4ull', icon: 'fab fa-facebook-f' },
    { link: '#', icon: 'fab fa-twitter' },
    { link: '#', icon: 'fab fa-instagram' },
    { link: '#', icon: 'fab fa-youtube' }
  ];
}
