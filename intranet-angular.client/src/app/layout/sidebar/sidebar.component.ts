import { Component, EventEmitter, Output } from '@angular/core';
export interface MenuItem {
  label: string;
  children?: MenuItem[];
  pdfUrl?: string; // URL do PDF associado ao item
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() documentSelected = new EventEmitter<string>();

  // Lista de menus
  menuItems: MenuItem[] = [
    {
      label: 'Documentos Corporativos',
      children: [
        {
          label: 'Relatórios',
          children: [
            { label: 'Relatório Anual', pdfUrl: 'assets/pdfs/relatorio-anual.pdf' },
            { label: 'Relatório Mensal', pdfUrl: 'assets/pdfs/relatorio-mensal.pdf' }
          ]
        },
        {
          label: 'Políticas',
          children: [
            { label: 'Política de Privacidade', pdfUrl: 'assets/pdfs/politica-privacidade.pdf' }
          ]
        }
      ]
    },
    {
      label: 'Manuais de Treinamento',
      children: [
        {
          label: 'Manual Técnico',
          pdfUrl: 'assets/pdfs/manual-tecnico.pdf'
        }
      ]
    }
  ];

  // Estado de expansão dos menus
  expandedItems: Set<string> = new Set();

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
    this.documentSelected.emit(pdfUrl);
  }
}
