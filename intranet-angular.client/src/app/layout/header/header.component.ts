import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  navbarfixed: boolean = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  onMobileMenuItemClick(menuItem: any): void {
    if (menuItem.submenu) {
      // Apenas expande ou recolhe o submenu
      this.toggleSubMenu(menuItem);
    } else {
      // Fecha o menu mobile apenas se não tiver submenu
      this.closeMobileMenu();
    }
  }

  toggleSubMenu(menuItem: any): void {
    if (menuItem.submenu) {
      this.menuItems.forEach(item => {
        if (item !== menuItem) {
          item.isOpen = false;
        }
      });
      menuItem.isOpen = !menuItem.isOpen;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onscroll() {
    this.navbarfixed = window.scrollY > 100;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth >= 768) {
      this.closeMobileMenu();
    }
  }

  trendingTitle = 'trending-title';
  trendingDescription = 'Class property employ ancho red multi level mansion';
  contactNumber = '+880166 253 232';

  logoLink = '';
  logoSrc = 'assets/img/logo/logo.png';
  logoAlt = 'Company Logo';

  headerBannerSrc = 'assets/img/gallery/header_card.png';
  headerBannerAlt = 'Header Banner';

  menuItems = [
    { label: 'Home', link: '' },
    { label: 'Noticias', link: '/noticias' },
    {
      label: 'Informações',
      link: '#',
      submenu: [
        { label: 'Aniversariantes', link: '/aniversariantes' },
        { label: 'Eventos', link: '/eventos' },
        { label: 'Cardápio', link: '/cardapio' }
      ],
      isOpen: false
    },
    { label: 'Gestão de documentos', link: '/documentos' },
    { label: 'Feedback/Sugestões', link: '/feedback' }
    //{ label: 'Contact', link: '/contact' }
  ];

  socialLinks = [
    { link: 'https://www.fb.com/sai4ull', icon: 'fab fa-facebook-f' },
    { link: '#', icon: 'fab fa-twitter' },
    { link: '#', icon: 'fab fa-instagram' },
    { link: '#', icon: 'fab fa-youtube' }
  ];
}
