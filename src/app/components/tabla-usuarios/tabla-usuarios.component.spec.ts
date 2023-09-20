import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUsuariosComponent } from './tabla-usuarios.component';

describe('TablaUsuariosComponent', () => {
  let component: TablaUsuariosComponent;
  let fixture: ComponentFixture<TablaUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaUsuariosComponent]
    });
    fixture = TestBed.createComponent(TablaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
