import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'question-content',
  templateUrl: './question-content.component.html',
  styleUrls: ['./question-content.component.scss']
})
export class QuestionContentComponent implements OnInit {

  @Input() currentQuestion:any;

  answerEval: string;
  result: any;

  constructor(private fbs: FirebaseService) { }

  getAnswer(question: any, answer: any) {
    question.answerEval = question.options[answer];
    // console.log(question.answer == answer);
  }

  submitAnswer() {
      
  }

  ngOnInit() {
  }

}
