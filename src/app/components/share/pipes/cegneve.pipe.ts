import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cegneve'
})
export class CegnevePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value ? `Cég: ${value}` : 'Cég: Nincs megadva';
  }
}
