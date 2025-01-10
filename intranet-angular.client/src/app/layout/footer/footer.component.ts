import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  footerData = {
    logoSrc: 'assets/img/logo/logo-footer.svg',
    logoAlt: 'Logo',
  };
}
