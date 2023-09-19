import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarViewComponent } from './solicitar-view.component';

describe('SolicitarViewComponent', () => {
  let component: SolicitarViewComponent;
  let fixture: ComponentFixture<SolicitarViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitarViewComponent]
    });
    fixture = TestBed.createComponent(SolicitarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
