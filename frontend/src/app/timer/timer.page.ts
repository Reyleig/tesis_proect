import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  constructor() { }
  time: BehaviorSubject<String> = new BehaviorSubject('00:00');
  minutes: any = 0;
  seconds: any = 0;
  milliseconds: any = 0;

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    setInterval(()=> {
      this.updateTimeValue()
    }, 10)
  }

  updateTimeValue() {
    this.milliseconds++;
    if (this.milliseconds / 100 === 1) {
      this.seconds++;
      this.milliseconds = 0;
      if (this.seconds / 60 === 1) {
        this.minutes++;
        this.seconds = 0;
      }
    }

    this.minutes = String('0' + Math.floor(this.minutes)).slice(-2);
    this.seconds = String('0' + Math.floor(this.seconds)).slice(-2);
    this.milliseconds = String('0' + this.milliseconds).slice(-2);

    const actualTime = `${this.minutes}:${this.seconds}:${this.milliseconds}`;
    this.time.next(actualTime);
  }

}
