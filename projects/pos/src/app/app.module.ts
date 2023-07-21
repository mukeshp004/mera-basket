import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgEventBus } from 'ng-event-bus';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { LayoutRoutingModule } from 'projects/common-lib/src/lib/layout/layout-routing.module';
import { ErrorInterceptorService } from 'projects/common-lib/src/lib/shared/interceptors/error-interceptor.service';
import { JwtInterceptorService } from 'projects/common-lib/src/lib/shared/interceptors/jwt-interceptor.service';
import { AbstractAppService } from 'projects/common-lib/src/lib/shared/services/abstract-app.service';
// import { SharedModule as CommonSharedModule } from 'projects/common-lib/src/lib/shared/shared.module';
import { LoginComponent } from './admin/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './shared/services/app.service';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from 'projects/common-lib/src/public-api';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,

    KeyboardShortcutsModule.forRoot(),
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
  ],
  providers: [
    NgEventBus,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptorService,
    //   multi: true,
    // },
    { provide: AbstractAppService, useClass: AppService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
