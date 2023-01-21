import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chart } from 'chart.js';
import { UtilitiesService } from '../services/general/utilities.service';
import { SwimmerService } from '../services/swimmer/swimmer.service';
import { TimesService } from '../services/times/times.service';
import { Select, Store } from '@ngxs/store';
import { IonModal } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserState } from '../login/store/user.state';
import { AddSwimmer } from '../swimmer/store/swimmer.actions';
import { SwimmerState } from '../swimmer/store/swimmer.state';
import { StatsService } from '../services/stats/stats.service';
import { TimerState } from '../timer/store/timer.state';
import { Router } from '@angular/router';



@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements AfterViewInit, OnInit {
  // @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  @ViewChild(IonModal) modal: IonModal;
  @Select(UserState) user$!: Observable<any>;
  @Select(SwimmerState) swimmer$!: Observable<any>;
  @Select(TimerState) timer$!: Observable<string>;




  swimmer: any;
  user: any;
  lineChart: any;
  isModalOpen = false;
  swimmers = [];
  tittleModal: string = 'Seleccionar nadador';
  nameSwimmer = '';
  estilos = [];
  times = [];
  showTimes = true;
  fechaActual


  timerForm;


  constructor(    
    private utilitiesService: UtilitiesService,
    private store: Store,
    private timesService: TimesService,
    private formBuilder: FormBuilder,
    private swimmerService: SwimmerService,
    private statsService: StatsService,
    private route: Router,
    ) { }

  ngOnInit() {

    this.timerForm =  this.formBuilder.group({
      estilos: ['', []],
      date: ['', []],
    });
    this.onChanges();

  }

  ngAfterViewInit() {
    // this.lineChartMethod();  
    this.swimmer$.subscribe((data: any) => {
      this.swimmer = data.name;
      this.nameSwimmer = this.swimmer.name;
    }).unsubscribe();

    this.user$.subscribe((data: any) => {
      this.user = data;
    }).unsubscribe();
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear();

    let fechaActual = month < 10? year + '-0' + month + '-' + day : year + '-' + month + '-' + day;
    this.timerForm.controls['date'].setValue(fechaActual);
    this.getEstilos(); 
    this.getTimes('1',fechaActual);   

  }

  onChanges(): void {
    this.timerForm.get('estilos').valueChanges.subscribe(val => {
        this.getTimes(val,this.timerForm.value.date);
    });
    this.timerForm.get('date').valueChanges.subscribe(val => {
      this.getTimes(this.timerForm.value.estilos,val);
  });

  }

  getTimes(val,fechaActual) {
    
    this.statsService.findTimesByFilters(this.swimmer.id,val,fechaActual).subscribe((data: any) => {
      if (data.status == 200) {
        this.times = data.payload;        
        this.showTimes = true;
      }else{
        this.utilitiesService.errorAlert('No hay tiempos registrados','Verifique los filtros');
        this.showTimes = false;
      }
    });
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
        this.swimmer = event;
        this.cerrarModal();
        this.getTimes(this.timerForm.value.estilos,this.timerForm.value.date);
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
  abrirModalStats(){
    this.route.navigate(['/graphics']);
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

}
