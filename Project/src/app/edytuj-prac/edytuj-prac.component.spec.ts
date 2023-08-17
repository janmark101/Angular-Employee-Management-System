import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdytujPracComponent } from './edytuj-prac.component';

describe('EdytujPracComponent', () => {
  let component: EdytujPracComponent;
  let fixture: ComponentFixture<EdytujPracComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdytujPracComponent]
    });
    fixture = TestBed.createComponent(EdytujPracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
