import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  questionData: any;

  constructor(private fbs: FirebaseService) {
    this.fbs.connectToNode("questionData");
    this.questionData = this.fbs.itemsList;
    // this.questionData.subscribe(res => {
    //   // console.log(res[0].$exists());
    // });
  }

  ngOnInit() {
  }

}
