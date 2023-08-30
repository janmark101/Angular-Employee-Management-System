import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfWorkersComponent } from './list-of-workers.component';

describe('ListOfWorkersComponent', () => {
  let component: ListOfWorkersComponent;
  let fixture: ComponentFixture<ListOfWorkersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfWorkersComponent]
    });
    fixture = TestBed.createComponent(ListOfWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
