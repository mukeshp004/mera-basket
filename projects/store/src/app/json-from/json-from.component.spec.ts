import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFromComponent } from './json-from.component';

describe('JsonFromComponent', () => {
  let component: JsonFromComponent;
  let fixture: ComponentFixture<JsonFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
