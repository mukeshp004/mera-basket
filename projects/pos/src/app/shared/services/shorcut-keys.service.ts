import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ShortcutEventOutput,
  ShortcutInput,
  AllowIn,
} from 'ng-keyboard-shortcuts';

@Injectable({
  providedIn: 'root',
})
export class ShorcutKeysService {
  constructor(private router: Router) {}

  getAppShorcutKeys(): ShortcutInput[] {
    const shortcuts = [
      {
        key: 'alt + s',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        command: (output: ShortcutEventOutput) =>
          this.router.navigate([`entity/sales`]),
      },
      {
        key: 'alt + p',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        command: (output: ShortcutEventOutput) =>
          this.router.navigate([`entity/purchase/add`]),
      },
      {
        key: 'alt + i',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        command: (output: ShortcutEventOutput) =>
          this.router.navigate([`entity/product`]),
      },
    ];

    return shortcuts;
  }
}
