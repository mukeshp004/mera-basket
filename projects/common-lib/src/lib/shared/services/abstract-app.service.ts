import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractAppService {
  abstract getMenu(): any[];
}
