import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { MenuItemResponse } from '../../../response/menuItemResponse';
import { environment } from '../../../environments/environment.dev';

@Component({
  selector: 'app-documents-manager',
  standalone: false,

  templateUrl: './documents-manager.component.html',
  styleUrl: './documents-manager.component.css'
})
export class DocumentsManagerComponent implements OnInit {
  selectedPdf: string = '';

  onDocumentSelected(pdfUrl: string) {
    this.selectedPdf = pdfUrl;
  }

  @Output() documentSelected = new EventEmitter<string>();
  menuItemsResponse: MenuItemResponse[] = [];
  expandedItems: Set<string> = new Set();
  menuItems: any[] = [];

  constructor(private menuItemService: MenuService) {
  }

  ngOnInit(): void {
    this.menuItemService.getAll().subscribe((data) => {
      this.menuItems = this.buildMenuHierarchy(data);
    });
    this.adjustHeight();
  }

  buildMenuHierarchy(items: MenuItemResponse[]): any[] {
    const map = new Map<number, any>();

    // Transformar os itens em objetos com `children`
    items.forEach((item) => {
      // Concatenando pdfUrl com environment.apiUrl
      const pdfUrl = item.pdfUrl ? `${environment.serverUrl}${item.pdfUrl}` : null;
      map.set(item.id, { ...item, pdfUrl, children: [] });
    });

    const hierarchy: any[] = [];

    items.forEach((item) => {
      if (item.parentId) {
        // Adicionar o item como filho de seu pai
        const parent = map.get(item.parentId);
        if (parent) {
          parent.children.push(map.get(item.id));
        }
      } else {
        // Adicionar ao nível superior
        hierarchy.push(map.get(item.id));
      }
    });

    return hierarchy;
  }

  // Alterna o estado de expansão do menu
  toggleExpand(label: string) {
    if (this.expandedItems.has(label)) {
      this.expandedItems.delete(label);
    } else {
      this.expandedItems.add(label);
    }
  }

  // Verifica se um menu está expandido
  isExpanded(label: string): boolean {
    return this.expandedItems.has(label);
  }

  // Emite o PDF selecionado
  selectDocument(pdfUrl: string) {
    //console.log(pdfUrl)
    //this.documentSelected.emit(pdfUrl);
    this.selectedPdf = pdfUrl;
  }

  isSidebarActive: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.adjustHeight();
  }

  adjustHeight(): void {
    const elements = document.querySelectorAll<HTMLElement>('.js-fullheight');
    const height = window.innerHeight;
    elements.forEach(element => {
      element.style.height = `${height}px`;
    });
  }

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }
}
