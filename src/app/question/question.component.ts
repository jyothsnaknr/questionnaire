import { animate, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Question, questionnaireData } from '../questionnaire';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  animations:[
    trigger('valueUpdated', [
      transition(':increment, :decrement, * => *', group([
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(40%)' }),
          animate(400, style({ opacity: 0, transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1, transform: 'translateX(0%)' }),
          animate(100, style({ opacity: 0, transform: 'translateX(-40%)' }))
        ], { optional: true })
      ]))
    ]),
  ]
})
export class QuestionComponent implements OnInit {

  @ViewChild('currentAnswer') currentAnswer: ElementRef;

  public questionData: Question[] = questionnaireData.questionnaire.questions;
  public currentQuestion = 0;
  public answers: string[] = [];
  public multiAnswer: string[] = [];

  constructor() { }

  public ngOnInit(): void {
  }

  get question(): Question {
    return this.questionData[this.currentQuestion];
  }

  public onAnswer(): void {
    this.answers[this.currentQuestion] = this.currentAnswer?.nativeElement?.value;
    this.currentAnswer.nativeElement.value = "";
    this.currentQuestion++;
  }

  public onMultiAnswer(value): void {
    if (this.multiAnswer.includes(value)) {
      this.multiAnswer = this.multiAnswer.filter(res => res !== value);
    }
    else {
      this.multiAnswer.push(value);
    }
  }

  public prev() {
    this.currentQuestion--;
  }

  public next() {
    this.currentQuestion++;
  }
}
