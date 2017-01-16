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
  // blurred: boolean = false;
  timerRunning: boolean = false;
  timerControl: any;
  timerPosition: number = 30;
  showQuestion: boolean = false;
  fail: boolean = false;
  correctAnswer: boolean;


  constructor(private fbs: FirebaseService, elementRef: ElementRef, renderer: Renderer) {

    // this.globalListenFunc = renderer.listenGlobal('document', 'click', (event) => {
    //    this.windowFocused();
    // });

    if(this.timerRunning)
      this.globalListenFunc = renderer.listenGlobal('window', 'blur', (event) => {
        this.windowBlurred();
      });

  }

  evalAnswer(answer: any) {
    this.answerEval = this.currentQuestion.options[answer];
    this.selectedAnswer = answer;
  }

  submitAnswer(answer) {
    // console.log("Selected: " + this.selectedAnswer + " -- Correct: " + this.currentQuestion.answer);
    this.timerRunning = false;
    if(this.selectedAnswer == this.currentQuestion.answer)
      this.correctAnswer = true;
    else {
      this.correctAnswer = false;
    }

  }

  startTimer() {
    this.timerRunning = true;
    var timerInterval = setInterval(() => {
        // console.log(this.timerRunning);
        if (--this.timerPosition < 1) {
            clearInterval(timerInterval);
            this.fail = true;
        }
        if(this.timerRunning == false)
        {
          clearInterval(timerInterval);
        }
    }, 1000);
  return(timerInterval);
  }

  // windowFocused() {
  //   if(this.showQuestion && !this.blurred && !this.timerRunning)
  //     this.timerControl = this.startTimer();
  // }

  windowBlurred() {
    // this.blurred = true;
    this.fail = true;
    clearInterval(this.timerControl);
  }

  toggleQuestion() {
    this.showQuestion = !this.showQuestion;
    // this.windowFocused();
    this.timerControl = this.startTimer();
  }

  ngOnInit() {
  }

}
