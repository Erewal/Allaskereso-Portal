import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes',
  standalone: true
})
export class PipesPipe implements PipeTransform {

  transform(value: string): string {
    if (!value.trim().startsWith('Helyszín:')) {
      return 'Helyszín: ' + value;
    }
    return value;
  }
}
