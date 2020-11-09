import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startedPipe',
})
export class StartedPipe implements PipeTransform {
  transform(input: number): string {
    //string type

    if (input === 0) {
      return 'Finalizado';
    } else {
      return 'Pausado';
    }
  }
}
