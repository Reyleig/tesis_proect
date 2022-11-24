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
  token: string;
  name: string;
  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  date: Date = new Date();
  isModalOpen = false;
  swimmerDto = new SwimmerDto();

  public swimmerForm = this.formBuilder.group({
    email: ['a@h.com', [Validators.required, Validators.minLength(3)]],
    name: ['Carlitos', [Validators.required, Validators.minLength(3)]],
    apellido: ['Coloradito', [Validators.required, Validators.minLength(3)]],
    celular: ['3006629947', [Validators.required, Validators.minLength(3)]],
    edad: ['30', [Validators.required, Validators.minLength(3)]],
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
    private alertController: AlertController,
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
    this.store.dispatch(new AddSwimmer('hola'));

    // this.swimmerForm = this.formBuilder.group({
    //   email: ['a@h.com', [Validators.required, Validators.minLength(3)]],
    //   name: ['Carlitos', [Validators.required, Validators.minLength(3)]],
    //   apellido: ['Coloradito', [Validators.required, Validators.minLength(3)]],
    //   celular: ['3006629947', [Validators.required, Validators.minLength(3)]],
    //   edad: ['30', [Validators.required]],
    //   date: [
    //     this.date.getFullYear() +
    //       '-' +
    //       this.date.getMonth() +
    //       1 +
    //       '-' +
    //       this.date.getDate(),
    //     [Validators.required, Validators.minLength(3)],
    //   ],
    //   categoria: ['Intermedio', [Validators.required, Validators.minLength(3)]],
    // });
  }
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getSwimmear();
      event.target.complete();
    }, 2000);
  }
  cancel(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.modal.dismiss(null, 'cancel');
  }

  confirm(isOpen: boolean) {
    // console.log(this.swimmerForm.valid);
    this.swimmerDto = this.swimmerForm.value;
    this.swimmerDto.idrol = 3;
    this.swimmerDto.token = this.token;

    console.log(this.swimmerDto);
    if (this.swimmerForm.valid) {
      this.isModalOpen = isOpen;
      this.modal.dismiss(this.name, 'confirm');

      this.swimmerService.addSwimmers(this.swimmerDto).subscribe((response) => {
        console.log(response);
        if (response) {
          console.log('entroaaaaa');
      this.resetFrom();

        } else {
          console.log(response);

          this.utilitiesService.errorAlert(
            'Error al crear deportista',
            'Intente de nuevo'
          );        }
      });
    }
  }

  getSwimmear() {
    this.swimmerService.getSwimmers(this.token).subscribe((response) => {
      console.log(response);
      if (response) {
        console.log('entro');
        this.swimmers = response;
      }
    });
  }
  creatFormSwimmer(isOpen: boolean) {
    console.log(this.swimmerForm.value);
    this.isModalOpen = isOpen;
    //poner fecha actual al formulario date
    this.swimmerForm.value.date =
      this.date.getDay() +
      '/' +
      this.date.getMonth() +
      '/' +
      this.date.getFullYear();

    // this.addSwimmer();
  }

  tomarTiempo(obj) {
    this.deportistas.setDeportista(obj);
    this.router.navigate(['/timer']);
  }

  async addSwimmer() {
    const alert = await this.alertController.create({
      header: 'Please enter your info',
      buttons: ['OK'],
      inputs: [
        {
          type: 'text',
          placeholder: 'Nombre',
        },
        {
          type: 'text',
          placeholder: 'Apellido',
        },
        {
          type: 'number',
          placeholder: 'Edad',
          min: 1,
          max: 100,
        },
        {
          type: 'tel',
          placeholder: 'Celular',
          min: 1,
          max: 100,
        },
        {
          type: 'email',
          placeholder: 'Correo',
          attributes: {
            maxlength: 8,
          },
        },
        {
          type: 'text',
          placeholder: 'Categoria',
        },
        {
          type: 'textarea',
          placeholder: 'A little about yourself',
        },
      ],
    });

    await alert.present();
  }

  resetFrom() {
    this.swimmerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      celular: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.minLength(3)]],
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
