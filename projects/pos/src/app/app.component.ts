import { Component, OnInit } from '@angular/core';
import { MessageBusConstant } from 'projects/common-lib/src/lib/shared/constants/message-bus.constant';
import { MessageBusService } from 'projects/common-lib/src/lib/shared/services/message-bus.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pos';

  constructor(
    private messageBus: MessageBusService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.logOutEvent();
  }

  logOutEvent() {
    this.messageBus.listen(MessageBusConstant.loggedOut).subscribe(() => {
      this.authService.logout();
    });
  }
}
