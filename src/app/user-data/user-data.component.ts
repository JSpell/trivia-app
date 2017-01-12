import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  questionData: any;
  date: any;
  singleQuestion: boolean = false;
  listQuestions: boolean = false;

  constructor(private fbs: FirebaseService) {

    
    this.getQuestion("20160922");
    // this.questionData.subscribe(result => {
    //   // this.itemsLoaded = true;
    //   console.log(result.length);
    // });



  }

  getQuestion(date) {
    var datePipe: DatePipe = new DatePipe('en-US');
    this.date = !date ? datePipe.transform(new Date(), "yyyyMMdd") : date;
    this.fbs.connectToNode("questionData/"+this.date);
    this.fbs.itemsObject.subscribe(res => {
      this.questionData = res;
      this.singleQuestion = !this.singleQuestion;
    });
  }

  getQuestions() {
    this.fbs.connectToNode("questionData/");
    this.questionData = this.fbs.itemsList;
  }

  ngOnInit() {
  }

}
