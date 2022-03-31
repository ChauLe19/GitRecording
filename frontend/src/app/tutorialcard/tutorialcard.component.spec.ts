import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialcardComponent } from './tutorialcard.component';

describe('TutorialcardComponent', () => {
  let component: TutorialcardComponent;
  let fixture: ComponentFixture<TutorialcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
