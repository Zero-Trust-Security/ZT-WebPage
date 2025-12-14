import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSystemComponent } from './dashboard-system.component';

describe('DashboardSystemComponent', () => {
  let component: DashboardSystemComponent;
  let fixture: ComponentFixture<DashboardSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardSystemComponent]
    });
    fixture = TestBed.createComponent(DashboardSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
