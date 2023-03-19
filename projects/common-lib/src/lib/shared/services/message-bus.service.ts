import { Injectable } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { Observable } from 'rxjs';

interface Message {
  channel: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class MessageBusService {
  constructor(private eventBus: NgEventBus) {}

  public publish(key: string, payLoad?: any): void {
    // console.log(key, payLoad);
    this.eventBus.cast(key, payLoad);
  }

  public listen(key: string): Observable<MetaData> {
    return this.eventBus.on(key);
  }
}
