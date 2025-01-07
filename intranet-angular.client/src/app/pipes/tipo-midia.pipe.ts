import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoMidiaPipe',
  standalone: false
})
export class TipoMidiaPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0: return 'Imagem';
      case 1: return 'Vídeo';
      case 2: return 'Ambos';
      default: return 'Outro';
    }
  }
}
