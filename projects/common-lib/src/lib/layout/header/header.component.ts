import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { IUser } from '../../shared/models/user';
// import { AuthService } from '../../shared/services/auth.service';
import { MessageBusConstant } from './../../shared/constants/message-bus.constant';
import { MessageBusService } from './../../shared/services/message-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // currentUser?: IUser;
  isSidebarCollapsed = false;

  constructor(
    private messageBus: MessageBusService /*, private auth: AuthService */
  ) {}

  ngOnInit(): void {
    // this.currentUser = this.auth.currentUserValue;
  }

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.messageBus.publish(
      MessageBusConstant.leftSideBarToggle,
      this.isSidebarCollapsed
    );
  }

  logout() {
    this.messageBus.publish(MessageBusConstant.loggedOut, {});
  }
}
