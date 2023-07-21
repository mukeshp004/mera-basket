import { Component, OnInit } from '@angular/core';
import { MessageBusConstant } from 'projects/common-lib/src/lib/shared/constants/message-bus.constant';
import { MessageBusService } from 'projects/common-lib/src/lib/shared/services/message-bus.service';
import { AuthService } from './shared/services/auth.service';
import { ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { Router } from '@angular/router';
import { ShorcutKeysService } from './shared/services/shorcut-keys.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pos';
  shortcuts: ShortcutInput[] = [];

  constructor(
    private messageBus: MessageBusService,
    private authService: AuthService,
    private shorcutKeysService: ShorcutKeysService
  ) {}

  ngOnInit(): void {
    this.logOutEvent();
    this.registerShorcuts();
  }

  logOutEvent() {
    this.messageBus.listen(MessageBusConstant.loggedOut).subscribe(() => {
      this.authService.logout();
    });
  }

  registerShorcuts() {
    this.shortcuts = this.shorcutKeysService.getAppShorcutKeys();
  }
}
