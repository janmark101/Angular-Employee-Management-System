import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZadaniaComponent } from './zadania.component';

describe('ZadaniaComponent', () => {
  let component: ZadaniaComponent;
  let fixture: ComponentFixture<ZadaniaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZadaniaComponent]
    });
    fixture = TestBed.createComponent(ZadaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
