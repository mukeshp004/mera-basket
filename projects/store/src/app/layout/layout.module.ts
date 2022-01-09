import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NgbAccordionModule,
  NgbCarouselModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    SharedModule,
    LayoutRoutingModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbCarouselModule,
  ],
})
export class LayoutModule {}
