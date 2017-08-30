import {Component, OnInit, Input, AfterContentInit, AfterViewInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'enginizer-countdown-timer',
  template: `
<div class="counter">
    Trebuie raspuns in : {{hoursRemaining}}h
</div>`,
  styles: [`
    .enginizer-timer {
      color: lightgray;
      font-weight: 200;
      font-size: 13px;
    }
  `]
})
export class CountdownTimerComponent implements OnInit {

  @Input("hoursRemaining")
  hoursRemaining:number;

  constructor() {
  }

  ngOnInit() {
    setInterval(() => { this.decrementDiffHours(); }, environment.doctorAnswerHoursDecrementInterval);
  }

  decrementDiffHours(){
    this.hoursRemaining = this.hoursRemaining - 1;
  }

}
