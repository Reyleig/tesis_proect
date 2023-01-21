import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ResetUser } from '../login/store/user.actions';
import { UserState } from '../login/store/user.state';
import { UtilitiesService } from '../services/general/utilities.service';
import { MenuController } from '@ionic/angular';
import { SwimmerState } from '../swimmer/store/swimmer.state';
import { FormBuilder, Validators } from '@angular/forms';
import { InicioService } from '../services/inicio/inicio.service';
import { ResetSwimmer } from '../swimmer/store/swimmer.actions';
import { ResetTimer } from '../timer/store/timer.actions';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @Select(UserState) user$!: Observable<any>;
  @Select(SwimmerState) swimmer$!: Observable<any>;
  @ViewChild(IonModal) modal: IonModal;

  username: string;
  swimmer: any;
  isModalOpen = false;
  titleModal: string = 'Cambiar password';
  token: string;
  //validar password minimo 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero, 1 caracter especial
  // form = this.formBuilder.group({
  //   password: [''],
  //   newPassword: [''],
  //   confirmPassword: [''],
  // });
  form = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
  });


  constructor(
    private router: Router,
    private store: Store,
    private utilitiesService: UtilitiesService,
    private menu: MenuController,
    private formBuilder: FormBuilder,
    private inicioService: InicioService

  ) { }

  ngOnInit() {
    this.user$.subscribe((data: any) => {
      if (data.token) {
        this.username = data.username;
        this.token = data.token;
      }
    }).unsubscribe();
    this.swimmer$.subscribe((data: any) => {
      this.swimmer = data.name;
    }).unsubscribe();
  }

  logout() {
    this.utilitiesService
      .infoAlert('Desea cerrar sesion')
      .then((result) => {
        if (result.role === 'confirm') {

          this.store.dispatch(new ResetUser());
          this.store.dispatch(new ResetSwimmer());
          this.store.dispatch(new ResetTimer());

          this.router.navigateByUrl('/login');
        }
      });
  }
  abrirModal() {
    this.isModalOpen = true;
    this.modal.present();
  }
  cerrarModal() {
    this.isModalOpen = false;
    this.modal.dismiss();
  }
  cerrarMenu() {
    this.menu.close();
  }


  opctionsMenu(opcion) {
    switch (opcion) {
      case 1:
        this.router.navigateByUrl('/swimmer');
        break;
      case 2:
        // console.log(this.swimmer);
        
        // if (Object.keys(this.swimmer).length === 0) {
        //   this.utilitiesService.infoAlert('Debe seleccionar un deportista').then((result) => {
        //     if (result.role === 'confirm') {
        //       this.router.navigate(['/swimmer']);
        //     }
        //   });
        //   return;
        // }
        this.router.navigateByUrl('/timer');
        break;
      case 3:
        this.router.navigateByUrl('/training');
        break;
      case 4:
        this.router.navigateByUrl('/stats');
        break;
      default:
        break;
    }
  }

  goProfile() {
    this.router.navigateByUrl('/profile');
  }


  cambiarPassword() {
    //validar si la nueva contraceña es igual a la confirmacion
    if (this.form.value.newPassword !== this.form.value.confirmPassword) {
      this.utilitiesService.infoAlert('Las contraseñas no coinciden');
      return;
    }

    let cambiarPassword = {
      token: this.token,
      actualPassword: this.utilitiesService.encrytarPassword(this.form.value.password),
      newPassword: this.cambiarPassword = this.utilitiesService.encrytarPassword(this.form.value.newPassword),
    }

    console.log(cambiarPassword);
    
    this.inicioService.cambiarPassword(cambiarPassword).subscribe((data: any) => {
      if (data) {
        if (data.status === 200) {
          this.utilitiesService.infoAlert(data.payload);
          this.cerrarModal();
        } else {
          this.utilitiesService.errorAlert(data.payload, data.recomendation);
        }
      } else {
        this.utilitiesService.errorAlert('Error en el servidor', 'Intente mas tarde');
      }

    });
  }
}
