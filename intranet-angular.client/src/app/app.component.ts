import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;
  isAdminRoute = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      if (this.router.url.startsWith('/admin')) {
        this.loadStyle('assets/css/admin-styles.css');
        // Verifica se a URL atual contém '/admin'
        this.isAdminRoute = true;
      }
      //else {
        //this.loadStyle('assets/css/main.css');
      //}
    });
  }

  loadStyle(href: string) {
    let linkElement = document.getElementById('dynamic-theme') as HTMLLinkElement;
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.id = 'dynamic-theme';
      linkElement.rel = 'stylesheet';
      document.head.appendChild(linkElement);
    }
    linkElement.href = href;
  }

  ngOnInit() {
    // Simula o carregamento
    setTimeout(() => {
      this.isLoading = false;
    }, 3000); // Tempo de carregamento em ms
  }
}
