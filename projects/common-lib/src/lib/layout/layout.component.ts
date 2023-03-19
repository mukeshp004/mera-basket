import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { MessageBusService } from '../shared/services/message-bus.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isSidebarCollapse = false;
  isSidebarCompact = false;

  constructor(
    private logger: NGXLogger,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.registerListeners();
  }

  /**
   * Register all the event
   */
  registerListeners(): void {}
}
