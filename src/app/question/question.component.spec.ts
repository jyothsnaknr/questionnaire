import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Question } from '../questionnaire';

import { QuestionComponent } from './question.component';

const mockQuestionData: Question[] = [
  {
    question_type: "multiple-choice",
    identifier: "list_1",
    headline: "Test question1?",
    description: null,
    required: false,
    multiple: false,
    choices: [
      {
        label: "Choice1 label",
        value: "Choice1 value",
        selected: false
      },
      {
        label: "Choice2 label",
        value: "Choice2 value",
        selected: false
      },
    ],
    jumps: []
  },
  {
    question_type: "text",
    identifier: "text_2",
    headline: "Test question2?",
    description: null,
    required: false,
    multiline: true,
    jumps: []
  },
];

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionComponent ],
      imports: [ BrowserAnimationsModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when questionData exists', () => {
    beforeEach(() => {
      component.questionData = mockQuestionData;
      fixture.detectChanges();
    });

    it('should show first question', () => {
      const questionHeadline = fixture.debugElement.query(By.css('.question-headline')).nativeElement as HTMLElement;
      expect(questionHeadline.innerHTML).toContain('Test question1?');
    });

    it('should show choice labels', () => {
      const choices = fixture.debugElement.queryAll(By.css('.choices'));
      expect((choices[0].nativeElement as HTMLElement).innerHTML).toContain('Choice1 label');
      expect((choices[1].nativeElement as HTMLElement).innerHTML).toContain('Choice2 label');
    });

    describe('when selecting the answer', () => {
      beforeEach(() => {
        const choices = fixture.debugElement.queryAll(By.css('.choices input'));
        (choices[0].nativeElement as HTMLElement).click();
        fixture.detectChanges();
      });

      it('should show the next question', () => {
        const questionHeadline = fixture.debugElement.query(By.css('.question-headline')).nativeElement as HTMLElement;
        expect(questionHeadline.innerHTML).toContain('Test question2?');
      });
    });
  });

  describe('when questionData does not exist', () => {
    beforeEach(() => {
      component.questionData = [];
    });

    it('should not show questions', () => {
      const questionHeadline = fixture.debugElement.query(By.css('.question-headline')).nativeElement as HTMLElement;
      expect(questionHeadline.innerHTML).not.toContain('Test question1?');
    })
  });
});
