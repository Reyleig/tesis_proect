import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeportistaService } from '../deportista.service';
import { UserState } from '../login/store/user.state';
import { UtilitiesService } from '../services/general/utilities.service';
import { SwimmerService } from '../services/swimmer/swimmer.service';
import { TimesService } from '../services/times/times.service';
import { AddSwimmer } from '../swimmer/store/swimmer.actions';
import { SwimmerState } from '../swimmer/store/swimmer.state';
import { AddTimer } from './store/timer.actions';
import { TimerState } from './store/timer.state';



@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit, OnDestroy {

  @Select(SwimmerState) swimmer$!: Observable<any>;
  @Select(TimerState) timer$!: Observable<string>;
  @Select(UserState) user$!: Observable<any>;

  @ViewChild(IonModal) modal: IonModal;


  swimmer: any;
  user: any;
  timer: any = {
    "banderas": {},
    "time": '00:00:00',
    "id_deportista": 0,
    "id_estilo": 0,
    "milisegundos": 0,
  };

  time: BehaviorSubject<string> = new BehaviorSubject('00:00:00');
  minutes: any = 0;
  seconds: any = 0;
  milliseconds: any = 0;
  milisegundosTotal: any = 0;
  millisecondsTotalBandera: any = 0;

  selectorDeportista = {};
  interval;
  isPlaying = false;
  startStopButton = false;
  lstBanderas = [];
  banderas = { time: '', diferencia: '', diferenciaMilisegundos: 0, cantidadBanderas: 0 };
  mostrarBanderas = false;
  nameSwimmer = '';
  isModalOpen = false;
  swimmers = [];
  tittleModal: string = 'Seleccionar nadador';
  estilos = [];


  timerForm = this.formBuilder.group({
    estilos: ['', []],
  });



  constructor(
    public deportistas: DeportistaService,
    private utilitiesService: UtilitiesService,
    private store: Store,
    private timesService: TimesService,
    private formBuilder: FormBuilder,
    private swimmerService: SwimmerService
  ) { }

  ngOnInit() {
    this.getEstilos();    
    this.getStateSwimmer();

    this.timer$.subscribe((data: any) => {
      console.log(data.time);
      this.timer = data;
      if (this.timer.time != '00:00:00') {
        this.timerForm.controls['estilos'].setValue(this.timer.id_estilo);
        this.time.next(this.timer.time);
        this.isPlaying = true;
        this.obtenerTime(this.timer.milisegundos);
        let banderas = JSON.parse(this.timer.banderas);
        for (let i = 0; i < banderas.length; i++) {
          this.lstBanderas.push(banderas[i]);
        }

        if (this.lstBanderas.length > 0) {
          this.mostrarBanderas = true;
        }
      }
    }).unsubscribe();

    this.user$.subscribe((data: any) => {
      this.user = data;
    }).unsubscribe();
  }

  getEstilos() {
    this.timesService.getEstilos().subscribe((response) => {
      if (response) {
        this.estilos = response.payload;
        this.timerForm.controls['estilos'].setValue('1');

      }
    });
  }


  cambiarSwimmer(event) {
    this.utilitiesService.infoAlert('¿Está seguro que desea cambiar de nadador?').then((response) => {
      if (response.role == 'confirm') {
        this.store.dispatch(new AddSwimmer(event));
        this.nameSwimmer = event.name;
        this.cerrarModal();
      }
    });
  }


  abrirModal() {
    this.isModalOpen = true;
    this.getSwimmear();
    this.modal.present();
  }
  cerrarModal() {
    this.isModalOpen = false;
    this.modal.dismiss();
  }

  getSwimmear() {
    this.swimmers = [];
    this.swimmerService.getSwimmers(this.user.token, 'A').subscribe((response) => {
      if (response) {
        this.swimmers = response;
        this.swimmers = this.swimmers.filter((item) => item.id !== this.swimmer.id)
        for (let i = 0; i < this.swimmers.length; i++) {
          this.swimmers[i].estado = this.swimmers[i].estado == 'A' ? true : false;
        }
      }
    });
  }

  //sacar minutos y segundos y milisegundos de milisegundosTotales
  obtenerTime(milisegundosTotales) {
    this.minutes = Math.floor(milisegundosTotales / 6000);
    this.seconds = Math.floor((milisegundosTotales % 6000) / 100);
    this.milliseconds = Math.floor(milisegundosTotales % 100);
    this.millisecondsTotalBandera = milisegundosTotales;
    this.interval = null;
  }


  crearBanderas() {
    this.mostrarBanderas = true;
    this.banderas.time = this.time.value;
    if (this.lstBanderas.length > 0) {
      this.banderas.diferenciaMilisegundos = this.millisecondsTotalBandera - this.lstBanderas[this.lstBanderas.length - 1].diferenciaMilisegundos;
      this.millisecondsTotalBandera = this.banderas.diferenciaMilisegundos;
      this.banderas.diferencia = this.obtenerBandera(this.banderas.diferenciaMilisegundos);
    }
    else {
      this.banderas.diferenciaMilisegundos = this.millisecondsTotalBandera;
      this.banderas.diferencia = this.obtenerBandera(this.millisecondsTotalBandera);
    }
    this.banderas.cantidadBanderas = this.lstBanderas.length + 1;
    this.lstBanderas.push(this.banderas);
    this.banderas = { time: '', diferencia: '', diferenciaMilisegundos: 0, cantidadBanderas: 0 };
  }

  getStateSwimmer() {
    this.swimmer$.subscribe((data: any) => {
      this.swimmer = data.name;
      this.nameSwimmer = this.swimmer.name;
    }).unsubscribe();
  }

  //guardar tiempo
  saveTime() {
    //pausar el cronometro
    this.pauseTimer();
    this.startStopButton = false;
    //obtiene el estado del swimmer
    this.getStateSwimmer();
    //mostrar confirmacion de guardado
    this.utilitiesService
      .infoAlert('Desea guardar el tiempo')
      .then((result) => {
        if (result.role === 'confirm') {
          const bandetasString = JSON.stringify(this.lstBanderas);
          let data = {
            "banderas": bandetasString,
            "time": this.time.value,
            "id_deportista": this.swimmer.id,
            "id_estilos": this.timerForm.value.estilos,
            "time_milisecons": this.milisegundosTotal,
          }

          this.timesService.createTimes(data).subscribe((data: any) => {
            if (data.status == 200) {
              this.stopTimer();
              this.utilitiesService.succesAlert(data.message);
            } else {
              this.utilitiesService.errorAlert(data.message, data.recommendation);
            }
          });

        }
      });
  }

  startTimer() {
    this.isPlaying = true;
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.updateTimeValue();
      }, 10);
    }
    this.selectorDeportista = this.deportistas.getDeportista();

  }
  startStopTimer() {
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
    this.millisecondsTotalBandera++;
    this.milisegundosTotal++;
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

    this.store.dispatch(new AddTimer(JSON.stringify(this.lstBanderas), actualTime, this.swimmer.id, this.timerForm.value.estilos, this.millisecondsTotalBandera));

    this.time.next(actualTime);
  }

  obtenerBandera(millisecondsTotalBandera) {
    let minutes = Math.floor(millisecondsTotalBandera / 6000);
    let seconds = Math.floor((millisecondsTotalBandera % 6000) / 100);
    let milliseconds = Math.floor(millisecondsTotalBandera % 100);
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
    this.milisegundosTotal = 0;
    this.millisecondsTotalBandera = 0;
    this.time.next(`00:00:00`);
    this.isPlaying = false;
    this.startStopButton = false;
    this.lstBanderas = [];
    this.mostrarBanderas = false;
    this.store.dispatch(new AddTimer(JSON.stringify(this.lstBanderas), '00:00:00', this.swimmer.id, this.timerForm.value.estilos, this.millisecondsTotalBandera));

  }

  ngOnDestroy() {

  }



}
