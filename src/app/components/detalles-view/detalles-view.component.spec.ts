import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesViewComponent } from './detalles-view.component';

describe('DetallesViewComponent', () => {
  let component: DetallesViewComponent;
  let fixture: ComponentFixture<DetallesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesViewComponent]
    });
    fixture = TestBed.createComponent(DetallesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
