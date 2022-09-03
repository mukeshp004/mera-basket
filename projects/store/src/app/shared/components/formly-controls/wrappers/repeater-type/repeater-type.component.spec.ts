import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeaterTypeComponent } from './repeater-type.component';

describe('RepeaterTypeComponent', () => {
  let component: RepeaterTypeComponent;
  let fixture: ComponentFixture<RepeaterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeaterTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeaterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
