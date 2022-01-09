import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageBusConstant } from './../../shared/constants/message-bus.constant';
import { MessageBusService } from './../../shared/services/message-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSidebarCollapsed = false;

  constructor(private messageBus: MessageBusService, private router: Router) {}

  ngOnInit(): void {}

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.messageBus.publish(
      MessageBusConstant.leftSideBarToggle,
      this.isSidebarCollapsed
    );
  }

  logout() {
    
    this.router.navigate(['/login']);
  }
}
