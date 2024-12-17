import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSubMenu(menuItem: any): void {
    if (menuItem.submenu) {
      // Fecha todos os outros submenus
      this.menuItems.forEach(item => {
        if (item !== menuItem) {
          item.isOpen = false;
        }
      });

      // Abre ou fecha o submenu clicado
      menuItem.isOpen = !menuItem.isOpen;
    }
  }
  navbarfixed: boolean = false;
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.navbarfixed = true
    } else {
      this.navbarfixed = false;
    }
  }

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
      ],
      isOpen: false
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
