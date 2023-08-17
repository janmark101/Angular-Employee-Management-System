import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPracownikowComponent } from './lista-pracownikow.component';

describe('ListaPracownikowComponent', () => {
  let component: ListaPracownikowComponent;
  let fixture: ComponentFixture<ListaPracownikowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPracownikowComponent]
    });
    fixture = TestBed.createComponent(ListaPracownikowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
