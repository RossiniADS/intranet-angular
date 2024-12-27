import { Pipe, PipeTransform } from '@angular/core';
import { DiaSemana } from '../enum/dia-semana.enum';

@Pipe({
  name: 'diaSemana',
  standalone: false
})
export class DiaSemanaPipe implements PipeTransform {

  transform(value: number): string {
    return DiaSemana[value] || value.toString();
  }
}
