import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarModule } from '@ngx-loading-bar/core';
// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AbstractAppService } from 'projects/common-lib/src/lib/shared/services/abstract-app.service';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { JsonFromComponent } from './json-from/json-from.component';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { PanelWrapperComponent } from './panel-wrapper/panel-wrapper.component';
import { ErrorInterceptorService } from './shared/interceptors/error-interceptor.service';
import { JwtInterceptorService } from './shared/interceptors/jwt-interceptor.service';
import { AppService } from './shared/services/app.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    JsonFromComponent,
    PanelWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    AdminModule,
    PagesModule,
    BrowserAnimationsModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },

    { provide: AbstractAppService, useClass: AppService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
