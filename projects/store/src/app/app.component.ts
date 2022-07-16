import { Component, HostListener } from '@angular/core';
import { MessageBusConstant } from './shared/constants/message-bus.constant';
import { MessageBusService } from './shared/services/message-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cupid-theme';
  width: any;

  constructor(private messageBus: MessageBusService) {}

  // @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any } }) {
    this.width = event.target.innerWidth;
    this.messageBus.publish(MessageBusConstant.windowResize, {
      width: this.width,
    });
  }
}
