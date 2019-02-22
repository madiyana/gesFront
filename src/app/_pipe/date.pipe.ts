import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, args?: any): any {
   // return value.s | slice:6:8}}/{{currentEvent.endDate | slice:4:6}}/{{currentEvent.endDate | slice:0:4}};
   return value && value.slice(0 , 2) + '/' + value.slice(2 , 4) + '/' + value.slice(4 , 8);
  }

}
