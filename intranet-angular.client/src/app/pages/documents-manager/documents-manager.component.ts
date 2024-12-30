import { Component, EventEmitter, Input, Output } from '@angular/core';
export interface MenuItem {
  label: string;
  children?: MenuItem[];
  pdfUrl?: string; // URL do PDF associado ao item
}

@Component({
  selector: 'app-documents-manager',
  standalone: false,
  
  templateUrl: './documents-manager.component.html',
  styleUrl: './documents-manager.component.css'
})
export class DocumentsManagerComponent {
  selectedPdf: string = '';

  onDocumentSelected(pdfUrl: string) {
    this.selectedPdf = pdfUrl;
  }


}
