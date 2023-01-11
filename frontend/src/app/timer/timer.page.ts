import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeportistaService } from '../deportista.service';
import { UtilitiesService } from '../services/general/utilities.service';
import { TimesService } from '../services/times/times.service';
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
  millisecondsTotal: any = 0;
  selectorDeportista={};
  interval;
  isPlaying = false;
  startStopButton = false;
  lstBanderas = [];
  banderas = {time:'',diferencia :'',diferenciaMilisegundos:0,cantidadBanderas:0};
  mostrarBanderas=false;

  
  constructor(
    public deportistas: DeportistaService,
    private utilitiesService: UtilitiesService,
    private store: Store,
    private timesService: TimesService,


  ) { }

  ngOnInit() {
    this.swimmer$.subscribe((data: any) => {
        this.swimmer = data.name;
    }).unsubscribe();
  }

  crearBanderas(){
    this.mostrarBanderas=true;
    this.banderas.time=this.time.value;
    if(this.lstBanderas.length>0){
      this.banderas.diferenciaMilisegundos=this.millisecondsTotal-this.lstBanderas[this.lstBanderas.length-1].diferenciaMilisegundos;
      this.millisecondsTotal=this.banderas.diferenciaMilisegundos;
      this.banderas.diferencia=this.obtenerBandera(this.banderas.diferenciaMilisegundos);
    }
    else{
      this.banderas.diferenciaMilisegundos=this.millisecondsTotal;
      this.banderas.diferencia=this.obtenerBandera(this.millisecondsTotal);
    }
    this.banderas.cantidadBanderas=this.lstBanderas.length+1;
    this.lstBanderas.push(this.banderas);
    this.banderas={time:'',diferencia:'',diferenciaMilisegundos:0,cantidadBanderas:0};
  }

  //guardar tiempo
  saveTime(){
    //pausar el cronometro
    this.pauseTimer();
    this.startStopButton = false;
    //mostrar confirmacion de guardado
    this.utilitiesService
    .infoAlert('Desea guardar el tiempo')
    .then((result) => {
      if (result.role === 'confirm') {
        console.log(this.swimmer);
        const bandetasString = JSON.stringify(this.lstBanderas);
        let data = {
          "banderas": bandetasString,
          "time": this.time.value,
          "id_deportista": this.swimmer.id
        }        
        this.timesService.createTimes(data).subscribe((data:any)=>{
          if(data.status == 200) {
            this.stopTimer();
            this.utilitiesService.succesAlert(data.message);
          }else{
            this.utilitiesService.errorAlert(data.message,data.recommendation);
          }
        });

      }
    });
    console.log(this.selectorDeportista);
    console.log(this.time.value);
  }

  startTimer() {
    this.isPlaying = true;
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
    this.millisecondsTotal++;
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

  obtenerBandera(millisecondsTotal) {
    let minutes = Math.floor(millisecondsTotal / 6000);
    let seconds = Math.floor((millisecondsTotal % 6000) / 100);
    let milliseconds = Math.floor(millisecondsTotal % 100);
    let stringminutes = String('0' + Math.floor(minutes)).slice(-2);
    let stringseconds = String('0' + Math.floor(seconds)).slice(-2);
    let stringmilliseconds = String('0' + milliseconds).slice(-2);
    const actualTime = `${stringminutes}:${stringseconds}:${stringmilliseconds}`;
    return actualTime;
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
    this.millisecondsTotal = 0;
    this.time.next(`00:00:00`);
    this.isPlaying = false;
    this.startStopButton = false;
    this.lstBanderas = [];
    this.mostrarBanderas=false;
  }




}
