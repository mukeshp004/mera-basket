import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatTableTypeComponent } from './repeat-table-type.component';

describe('RepeateTableTypeComponent', () => {
  let component: RepeatTableTypeComponent;
  let fixture: ComponentFixture<RepeatTableTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepeatTableTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepeatTableTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
