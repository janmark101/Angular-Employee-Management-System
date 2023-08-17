import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPracownikaComponent } from './dodaj-pracownika.component';

describe('DodajPracownikaComponent', () => {
  let component: DodajPracownikaComponent;
  let fixture: ComponentFixture<DodajPracownikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajPracownikaComponent]
    });
    fixture = TestBed.createComponent(DodajPracownikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
