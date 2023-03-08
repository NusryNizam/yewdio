import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return `${(Math.floor(value / 60)).toFixed(0)}:${(value % 60).toFixed(0)}`
  }

}
