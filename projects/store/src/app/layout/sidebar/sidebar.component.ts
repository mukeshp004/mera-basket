import { Component, OnInit } from '@angular/core';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { NGXLogger } from 'ngx-logger';
import { MessageBusConstant } from '../../shared/constants/message-bus.constant';
import { MessageBusService } from '../../shared/services/message-bus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isSidebarCollapse = false;
  isSidebarCompact = false;

  constructor(
    private logger: NGXLogger,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.registerListeners();
  }

  messageBusListener() {
    this.messageBus
      .listen(MessageBusConstant.windowResize)
      .subscribe((metaData: any) => {
        this.onWindowResize(metaData.data.width);
      });
  }

  /**
   * Register all the event
   */
  registerListeners(): void {
    this.sidebarToggleListener();
    this.messageBusListener();
  }

  /**
   * Register sidebar toggle event
   */
  sidebarToggleListener(): void {
    this.messageBus
      .listen(MessageBusConstant.leftSideBarToggle)
      .subscribe((payLoad: MetaData) => {
        this.isSidebarCollapse = payLoad.data;
      });
  }

  onWindowResize(width: number = 0) {
    if (width < 600) {
      this.isSidebarCollapse = true;
    } else {
      this.isSidebarCollapse = false;
    }
  }
}
