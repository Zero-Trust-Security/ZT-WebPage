import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UEBAComponent } from './ueba.component';

describe('UEBAComponent', () => {
  let component: UEBAComponent;
  let fixture: ComponentFixture<UEBAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UEBAComponent]
    });
    fixture = TestBed.createComponent(UEBAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
