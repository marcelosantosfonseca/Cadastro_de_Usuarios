import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirUsuariosComponent } from './inserir-usuarios.component';

describe('InserirUsuariosComponent', () => {
  let component: InserirUsuariosComponent;
  let fixture: ComponentFixture<InserirUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
