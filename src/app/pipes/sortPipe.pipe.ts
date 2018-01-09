import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'sortPipe'
})
export class PipeSort implements PipeTransform {
    transform(value: any[]): any[] {
        value.sort((a: any, b: any) => {
            if (a.name < b.name) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        return value;
    }
}