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
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';


  constructor(
    private swimmerService: SwimmerService,
    private router: Router,
    public deportistas: DeportistaService,
    private store: Store,
    private alertController: AlertController
  ) {
    this.user$
      .subscribe((data: any) => {
        if (data.token) {
          this.token =  data.token;
        }
      })
      .unsubscribe();
  }

  ngOnInit() {
    this.getSwimmear();
    this.store.dispatch(new AddSwimmer('hola'));
  }


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  getSwimmear() {
    this.swimmerService.getSwimmers(this.token).subscribe(response => {
      console.log(response);
      if (response) {
        console.log('entro');
        this.swimmers = response;
      }
    });
  }

  tomarTiempo(obj) {
    this.deportistas.setDeportista(obj);
    this.router.navigate(['inicio/timer']);
  }

  // async addSwimmer() {
  //   const alert = await this.alertController.create({
  //     header: 'Please enter your info',
  //     buttons: ['OK'],
  //     inputs: [
  //       {
  //         type: 'text',
  //         placeholder: 'Nombre',
  //       },
  //       {
  //         type: 'text',
  //         placeholder: 'Apellido',
  //       },
  //       {
  //         type: 'number',
  //         placeholder: 'Edad',
  //         min: 1,
  //         max: 100,
  //       },
  //       {
  //         type: 'tel',
  //         placeholder: 'Celular',
  //         min: 1,
  //         max: 100,
  //       },
  //       {
  //         type: 'email',
  //         placeholder: 'Correo',
  //         attributes: {
  //           maxlength: 8,
  //         },
  //       },
  //       {
  //         type: 'text',
  //         placeholder: 'Categoria',
  //       },
  //       {
  //         type: 'textarea',
  //         placeholder: 'A little about yourself',
  //       },
  //     ],
  //   });

  //   await alert.present();    
  // }
}
