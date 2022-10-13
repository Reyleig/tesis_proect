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
import { OverlayEventDetail } from '@ionic/core/components';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

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

  public swimmerForm: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', { nonNullable: true }),
    email: new UntypedFormControl('', { nonNullable: true }),
    lastname: new UntypedFormControl('', { nonNullable: true }),
    celphone: new UntypedFormControl('', { nonNullable: true }),
    age: new UntypedFormControl('', { nonNullable: true }),
    date: new UntypedFormControl('', { nonNullable: true }),
    category: new UntypedFormControl('', { nonNullable: true }),
  });

  constructor(
    private swimmerService: SwimmerService,
    private router: Router,
    public deportistas: DeportistaService,
    private store: Store,
    private alertController: AlertController,
    private formBuilder: FormBuilder
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
  }

  cancel(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.modal.dismiss(null, 'cancel');
  }

  confirm(isOpen: boolean) {
    //validar si el formulario es validator
    if(this.swimmerForm.valid){
      this.resetFrom();
      this.isModalOpen = isOpen;
      this.modal.dismiss(this.name, 'confirm');
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
    // this.addSwimmer();
  }

  tomarTiempo(obj) {
    this.deportistas.setDeportista(obj);
    this.router.navigate(['inicio/timer']);
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

  resetFrom(){
    this.swimmerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      celphone: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.minLength(3)]],
      date: [
        new Date().getDate(),
        [Validators.required, Validators.minLength(3)],
      ],
      category: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
