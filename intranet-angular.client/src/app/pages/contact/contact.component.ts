import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: false,

  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactTitle = 'Get in Touch';

  formData = {
    message: '',
    name: '',
    email: '',
    subject: ''
  };

  contactInfos = [
    { icon: 'fa-solid fa-house', title: 'Buttonwood, California.', description: 'Rosemead, CA 91770' },
    { icon: 'fa-solid fa-tablet-screen-button', title: '+1 253 565 2365', description: 'Mon to Fri 9am to 6pm' },
    { icon: 'fa-regular fa-envelope', title: 'support@colorlib.com', description: 'Send us your query anytime!' }
  ];

  // Configuração do mapa
  mapUrl: string;
  mapLink: string;

  constructor(public sanitizer: DomSanitizer) {
    // Coordenadas da localização (latitude e longitude)
    const latitude = -22.734428;
    const longitude = -45.120099;

    // URL para exibir o mapa com as coordenadas
    this.mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.002}%2C${latitude - 0.002}%2C${longitude + 0.002}%2C${latitude + 0.002}&layer=mapnik&marker=${latitude}%2C${longitude}`;

    // Link para o mapa maior
    this.mapLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`;
  }

  ngOnInit(): void { }

  onSubmit(): void {
    console.log('Form submitted:', this.formData);
  }
}
