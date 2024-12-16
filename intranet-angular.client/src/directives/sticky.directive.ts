import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSticky]',
  standalone: false,
})
export class StickyDirective {
  @Input() topSpacing: number = 0; // Espaçamento no topo
  @Input() stickyClass: string = 'is-sticky'; // Classe a ser adicionada quando o elemento estiver fixo

  private isSticky: boolean = false; // Controle do estado
  private initialOffset: number = 0; // Posição inicial do elemento

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.initialOffset = this.el.nativeElement.getBoundingClientRect().top;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.initialOffset - this.topSpacing) {
      if (!this.isSticky) {
        this.isSticky = true;
        this.renderer.addClass(this.el.nativeElement, this.stickyClass);
        this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.el.nativeElement, 'top', `${this.topSpacing}px`);
        this.renderer.setStyle(this.el.nativeElement, 'width', '100%'); // Garante que o menu ocupe a largura correta
        this.renderer.setStyle(this.el.nativeElement, 'z-index', '1000'); // Garante que o menu esteja acima de outros elementos
      }
    } else {
      if (this.isSticky) {
        this.isSticky = false;
        this.renderer.removeClass(this.el.nativeElement, this.stickyClass);
        this.renderer.removeStyle(this.el.nativeElement, 'position');
        this.renderer.removeStyle(this.el.nativeElement, 'top');
        this.renderer.removeStyle(this.el.nativeElement, 'width');
        this.renderer.removeStyle(this.el.nativeElement, 'z-index');
      }
    }
  }
}
