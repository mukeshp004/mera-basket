import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
})
export class KeysPipe implements PipeTransform {
  transform(value: any, args?: unknown[]): any {
    let list = [];
    for (var key in value) {
      if (!isNaN(parseInt(key, 10))) {
        list.push({ key: key, value: value[key] });
        // Uncomment if you want log
        // console.log("enum member: ", value[enumMember]);
      }
    }
    return list;
  }
}
