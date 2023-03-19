import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonCellRendererComponent } from './action-button-cell-renderer.component';

describe('ActionButtonCellRendererComponent', () => {
  let component: ActionButtonCellRendererComponent;
  let fixture: ComponentFixture<ActionButtonCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionButtonCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
