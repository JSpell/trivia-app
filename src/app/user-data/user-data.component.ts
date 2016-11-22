import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  questionData: any;
  answerEval: string;
  result: any;

  constructor(private fbs: FirebaseService) {
    this.fbs.connectToNode("questionData");
    this.questionData = this.fbs.itemsList;
    this.questionData.subscribe(res => {
      // console.log(res[0].$exists());
    });
  }

  getAnswer(question: any, answer: any) {
    question.answerEval = question.options[answer];
    // console.log(question.answer == answer);
  }

  submitAnswer() {
      
  }

  ngOnInit() {
  }

}
