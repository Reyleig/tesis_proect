import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeportistaService } from '../deportista.service';
import { UserState } from '../login/store/user.state';
import { SwimmerService } from '../services/swimmer/swimmer.service';
import { AddSwimmer } from './store/swimmer.actions';
import { SwimmerState } from './store/swimmer.state';
import { SwimmerDto } from '../models/SwimmerDto';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilitiesService } from '../services/general/utilities.service';

@Component({
  selector: 'app-swimmer',
  templateUrl: './swimmer.page.html',
  styleUrls: ['./swimmer.page.scss'],
})
export class SwimmerPage implements OnInit {
  @Select(SwimmerState) swimmer$!: Observable<string>;
  @Select(UserState) user$!: Observable<any>;
  @ViewChild(IonModal) modal: IonModal;

  swimmer!: string;
  swimmers = [];
  swimmersInactive = [];
  token: string;
  name: string;
  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  date: Date = new Date();
  isModalOpen = false;
  swimmerDto = new SwimmerDto();
  tittleModal: string;
  isEdit = false;

  swimmerForm = this.formBuilder.group({
    id: ['', []],
    email: ['', [Validators.required, Validators.minLength(3)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    celular: ['', [Validators.required, Validators.minLength(3)]],
    edad: [0, [Validators.required, Validators.minLength(1)]],
    date: [
      this.date.getDate() +
      '/' +
      this.date.getMonth() +
      '/' +
      this.date.getDay(),
      [Validators.required, Validators.minLength(3)],
    ],
    categoria: ['Intermedio', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private swimmerService: SwimmerService,
    private router: Router,
    public deportistas: DeportistaService,
    private store: Store,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,

  ) {
    this.user$
      .subscribe((data: any) => {
        if (data.token) {
          this.token = data.token;
        }
      })
      .unsubscribe();

    this.resetFrom();
  }

  ngOnInit() {
    this.getSwimmear();
    this.getSwimmearInactive();
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.getSwimmear();
      this.getSwimmearInactive();
      event.target.complete();
    }, 2000);
  }
  cancel(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.modal.dismiss(null, 'cancel');
  }

  confirm(isOpen: boolean) {
    this.swimmerDto = this.swimmerForm.value;
    console.log(this.swimmerForm.valid);
    if (this.swimmerForm.valid) {
      this.isModalOpen = isOpen;
      this.modal.dismiss(this.name, 'confirm');
      if (this.isEdit) {
        this.swimmerService.updateSwimmers(this.swimmerDto).subscribe((response) => {
          console.log(response);
          if (response) {
            this.resetFrom();
          } else {
            this.utilitiesService.errorAlert(
              'Error al crear deportista',
              'Intente de nuevo'
            );
          }
        });

      } else {
        this.swimmerDto.idrol = 3;
        this.swimmerDto.token = this.token;
        this.swimmerService.addSwimmers(this.swimmerDto).subscribe((response) => {
          if (response) {
            this.resetFrom();
          } else {
            this.utilitiesService.errorAlert(
              'Error al crear deportista',
              'Intente de nuevo'
            );
          }
        });
      }

    }
  }

  getSwimmear() {
    this.swimmers = [];
    this.swimmerService.getSwimmers(this.token, 'A').subscribe((response) => {
      if (response) {
        this.swimmers = response;
        for (let i = 0; i < this.swimmers.length; i++) {
          this.swimmers[i].estado = this.swimmers[i].estado == 'A' ? true : false;
        }

      }
    });
  }
  
  editarSwimmer(swimmer) {
    this.tittleModal = 'Editar <br />  Deportista';
    this.isEdit = true;
    this.swimmerForm.controls['id'].setValue(swimmer.id);
    this.swimmerForm.controls['email'].setValue(swimmer.email);
    this.swimmerForm.controls['name'].setValue(swimmer.name);
    this.swimmerForm.controls['apellido'].setValue(swimmer.apellido);
    this.swimmerForm.controls['celular'].setValue(swimmer.celular);
    this.swimmerForm.controls['edad'].setValue(swimmer.edad);
    this.swimmerForm.controls['date'].setValue(swimmer.date);
    this.swimmerForm.controls['categoria'].setValue(swimmer.categoria);
    this.isModalOpen = true;

  }
  getSwimmearInactive() {
    this.swimmersInactive = [];
    this.swimmerService.getSwimmers(this.token, 'I').subscribe((response) => {
      console.log(response);
      if (response) {
        console.log('entro');
        this.swimmersInactive = response;
        for (let i = 0; i < this.swimmersInactive.length; i++) {
          this.swimmersInactive[i].estado = this.swimmersInactive[i].estado == 'A' ? true : false;
        }

      }
    });
  }
  creatFormSwimmer(isOpen: boolean) {
    this.tittleModal = 'Crear <br /> Deportista';
    if (this.isEdit) {
      this.resetFrom();
    }

    this.isEdit = false;
    console.log(this.swimmerForm.value);
    this.isModalOpen = isOpen;
    this.swimmerForm.value.date =
      this.date.getDay() +
      '/' +
      this.date.getMonth() +
      '/' +
      this.date.getFullYear();

  }

  tomarTiempo(obj) {
    this.store.dispatch(new AddSwimmer(obj));
    this.deportistas.setDeportista(obj);
    this.router.navigate(['/timer']);
  }

  inactivarSwimmer(obj) {
    console.log(obj);

    this.swimmerService.inactivateSwimmer(this.token, obj.id, obj.estado).subscribe((response) => {
      console.log(response);
      if (true) {
        console.log('entro');
        // this.swimmers = response;
        obj.estado = obj.estado == true ? false : true;
        console.log(obj.estado);

      }
    });
  }

  resetFrom() {
    this.swimmerForm = this.formBuilder.group({
      id: ['', []],
      email: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      celular: ['', [Validators.required, Validators.minLength(3)]],
      edad: [0, [Validators.required, Validators.minLength(1)]],
      date: [
        this.date.getDate() +
        '/' +
        this.date.getMonth() +
        '/' +
        this.date.getDay(),
        [Validators.required, Validators.minLength(3)],
      ],
      categoria: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
