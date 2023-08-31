import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingWorkersComponent } from './routing-workers.component';

describe('RoutingWorkersComponent', () => {
  let component: RoutingWorkersComponent;
  let fixture: ComponentFixture<RoutingWorkersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutingWorkersComponent]
    });
    fixture = TestBed.createComponent(RoutingWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
