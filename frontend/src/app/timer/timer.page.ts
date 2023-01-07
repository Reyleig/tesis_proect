import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeportistaService } from '../deportista.service';
import { UtilitiesService } from '../services/general/utilities.service';
import { SwimmerState } from '../swimmer/store/swimmer.state';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  @Select(SwimmerState) swimmer$!: Observable<any>;
  swimmer: any;


  time: BehaviorSubject<string> = new BehaviorSubject('00:00:00');
  minutes: any = 0;
  seconds: any = 0;
  milliseconds: any = 0;
  selectorDeportista={};
  interval;
  startStopButton = false;
  
  constructor(
    public deportistas: DeportistaService,
    private utilitiesService: UtilitiesService,
    private store: Store,


  ) { }

  ngOnInit() {
    this.swimmer$.subscribe((data: any) => {
        this.swimmer = data.name;
    }).unsubscribe();
  }

  //guardar tiempo
  saveTime(){
    //pausar el cronometro
    this.pauseTimer();
    //mostrar confirmacion de guardado
    this.utilitiesService
    .infoAlert('Desea guardar el tiempo')
    .then((result) => {
      if (result.role === 'confirm') {
        console.log(this.swimmer);
        
      }
    });
    console.log(this.selectorDeportista);
    console.log(this.time.value);
  }

  startTimer() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.updateTimeValue();
      }, 10);
    }
    this.selectorDeportista=this.deportistas.getDeportista();

  }
  startStopTimer() {
    console.log(this.interval);
    
    if (!this.interval) {
      this.startTimer();
      this.startStopButton = true;
    } else {
      this.startStopButton = false;
      this.pauseTimer();
    }
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
