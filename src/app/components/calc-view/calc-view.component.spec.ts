import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcViewComponent } from './calc-view.component';

describe('CalcViewComponent', () => {
  let component: CalcViewComponent;
  let fixture: ComponentFixture<CalcViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalcViewComponent]
    });
    fixture = TestBed.createComponent(CalcViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
