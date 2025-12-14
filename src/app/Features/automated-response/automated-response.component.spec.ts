import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatedResponseComponent } from './automated-response.component';

describe('AutomatedResponseComponent', () => {
  let component: AutomatedResponseComponent;
  let fixture: ComponentFixture<AutomatedResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomatedResponseComponent]
    });
    fixture = TestBed.createComponent(AutomatedResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
