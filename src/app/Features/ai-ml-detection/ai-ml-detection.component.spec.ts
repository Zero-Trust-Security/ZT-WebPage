import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiMlDetectionComponent } from './ai-ml-detection.component';

describe('AiMlDetectionComponent', () => {
  let component: AiMlDetectionComponent;
  let fixture: ComponentFixture<AiMlDetectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiMlDetectionComponent]
    });
    fixture = TestBed.createComponent(AiMlDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
