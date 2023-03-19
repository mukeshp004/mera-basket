import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgEventBus } from 'ng-event-bus';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { LayoutRoutingModule } from 'projects/common-lib/src/lib/layout/layout-routing.module';
import { AbstractAppService } from 'projects/common-lib/src/lib/shared/services/abstract-app.service';
// import { SharedModule as CommonSharedModule } from 'projects/common-lib/src/lib/shared/shared.module';
import { LayoutModule } from 'projects/common-lib/src/public-api';
import { LoginComponent } from './admin/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { AppService } from './shared/services/app.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, SidebarComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutRoutingModule,
    SharedModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
  ],
  providers: [
    NgEventBus,
    { provide: AbstractAppService, useClass: AppService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
