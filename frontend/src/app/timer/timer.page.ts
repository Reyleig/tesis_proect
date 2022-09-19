import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeportistaService } from '../deportista.service';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  time: BehaviorSubject<string> = new BehaviorSubject('00:00:00');
  minutes: any = 0;
  seconds: any = 0;
  milliseconds: any = 0;
  selectorDeportista={};
  private interval;
  constructor(
    public deportistas: DeportistaService


  ) { }

  ngOnInit() {
    // this.startTimer();

  }

  startTimer() {
    this.interval = setInterval(()=> {
      this.updateTimeValue();
    }, 10);
    this.selectorDeportista=this.deportistas.getDeportista();

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

  pauseTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  stopTimer() {
    this.pauseTimer();
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
    this.time.next(`00:00:00`);
  }




}
