import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationWrapperComponent } from './configuration-wrapper.component';

describe('ConfigurationWrapperComponent', () => {
  let component: ConfigurationWrapperComponent;
  let fixture: ComponentFixture<ConfigurationWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
