import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoweZadanieComponent } from './nowe-zadanie.component';

describe('NoweZadanieComponent', () => {
  let component: NoweZadanieComponent;
  let fixture: ComponentFixture<NoweZadanieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoweZadanieComponent]
    });
    fixture = TestBed.createComponent(NoweZadanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
