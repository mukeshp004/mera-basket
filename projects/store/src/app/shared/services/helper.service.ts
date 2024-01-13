import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  enum2Options(obj: any, args?: unknown[]): any[] {
    let list = [];
    for (let key in obj) {
      if (!isNaN(parseInt(key, 10))) {
        list.push({ value: +key, label: obj[key] });
      }
    }
    return list;
  }

  toFormData(params: any) {
    const formData = new FormData();

    Object.entries(params).forEach(([key, value]) => {
      formData.append(key, (value as any));
    });

    return formData;
  }
}
