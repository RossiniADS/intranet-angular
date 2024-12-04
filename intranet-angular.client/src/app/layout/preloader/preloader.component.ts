import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preloader',
  standalone: false,
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent {
  @Input() isLoading: boolean = true; // Controla a exibição do preloader
}
