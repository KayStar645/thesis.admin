import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeComma',
})
export class RemoveCommaPipe implements PipeTransform {
  transform(value: string): number {
    const cleanedValue = value.replace(/,/g, '');
    return parseInt(cleanedValue, 10);
  }
}
