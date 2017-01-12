import { Component, OnInit, Input, Renderer, ElementRef } from '@angular/core';
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
  selectedAnswer: any;
  focus: void;
  globalListenFunc: Function;
  blurred: boolean = false;
  timerRunning: boolean = false;
  timerControl: any;
  timerPosition: number;
  showQuestion: boolean = false;
  fail: boolean = false;


  constructor(private fbs: FirebaseService, elementRef: ElementRef, renderer: Renderer) {

    // this.globalListenFunc = renderer.listenGlobal('window', 'focus', (event) => {
    //   //  console.log(event.type)
    //    this.windowFocused();
    // });

    this.globalListenFunc = renderer.listenGlobal('document', 'click', (event) => {
      //  console.log(event.type)
       this.windowFocused();
    });

    this.globalListenFunc = renderer.listenGlobal('window', 'blur', (event) => {
       this.windowBlurred();
    });

  }

  evalAnswer(answer: any) {
    this.answerEval = this.currentQuestion.options[answer];
    this.selectedAnswer = answer;
  }

  submitAnswer(answer) {
    console.log("Selected: " + this.selectedAnswer + " -- Correct: " + this.currentQuestion.answer);
    if(this.selectedAnswer == this.currentQuestion.answer)
      alert("Correct");
    else
      alert("WRONG!");
  }

  startTimer() {
    this.timerRunning = true;
    var timer = 30;
    var timerInterval = setInterval(() => {
        console.log(timer + " seconds");
        this.timerPosition = timer;
        if (--timer < 1) {
            clearInterval(timerInterval);
            console.log("Time's up!")
            this.fail = true;
        }
    }, 1000);
  return(timerInterval);
  }

  windowFocused() {
    if(this.showQuestion && !this.blurred && !this.timerRunning)
      this.timerControl = this.startTimer();
  }

  windowBlurred() {
    this.blurred = true;
    this.fail = true;
    clearInterval(this.timerControl);
  }

  toggleQuestion() {
    this.showQuestion = !this.showQuestion;
    this.windowFocused();
  }

  ngOnInit() {
  }

}
