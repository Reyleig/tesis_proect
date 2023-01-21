import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, MenuController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ResetUser } from 'src/app/login/store/user.actions';
import { UserState } from 'src/app/login/store/user.state';
import { ResetSwimmer } from 'src/app/swimmer/store/swimmer.actions';
import { SwimmerState } from 'src/app/swimmer/store/swimmer.state';
import { ResetTimer } from 'src/app/timer/store/timer.actions';
import { UtilitiesService } from 'src/app/services/general/utilities.service';
import { CoachService } from 'src/app/services/admin/coach/coach.service';
import { FormBuilder, Validators } from '@angular/forms';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { SwimmerService } from 'src/app/services/swimmer/swimmer.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {
  @Select(UserState) user$!: Observable<any>;
  @Select(SwimmerState) swimmer$!: Observable<any>;
  @ViewChild(IonModal) modal: IonModal;


  coachs = [];
  coachsInactivos = [];
  isModalOpen = false;
  token: string;

  form = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
  });
  constructor(
    private menu: MenuController,
    private router: Router,
    private store: Store,
    private utilitiesService: UtilitiesService,
    private coachService: CoachService,
    private formBuilder: FormBuilder,
    private inicioService: InicioService,
    private swimmerService: SwimmerService

  ) { }

  ngOnInit() {
    console.log('ngOnInit');
    
    this.getAllCoaches();

    this.user$.subscribe((data: any) => {
      if (data.token) {
        this.token = data.token;
        return this.token;
      }
    }).unsubscribe();
  }

  getAllCoaches() {
    this.coachs = [];    
    this.coachService.getAllCoach('A').subscribe((data) => {
      this.coachs = data.payload; 
      for (let i = 0; i < this.coachs.length; i++) {
        this.coachs[i].estado = this.coachs[i].estado == 'A' ? true : false;
      }     
      
    },
    (error) => {
      this.utilitiesService.errorAlert(error.error.message, 'Intenta mas tarde');
    }
    );
    this.coachService.getAllCoach('I').subscribe((data) => {
      this.coachsInactivos= data.payload; 
      for (let i = 0; i < this.coachsInactivos.length; i++) {
        this.coachsInactivos[i].estado = this.coachsInactivos[i].estado == 'A' ? true : false;
      }     
      
    },
    (error) => {
      this.utilitiesService.errorAlert(error.error.message, 'Intenta mas tarde');
    }
    );
  }

  resetPassword(data) {
    const info = {
      id: data.id,
      newPassword: this.utilitiesService.encrytarPassword(data.email)
    }
    this.coachService.resetPassword(info).subscribe((data) => {
      console.log(data);
    },
    (error) => {
      this.utilitiesService.errorAlert(error.error.message, 'Intenta mas tarde');
    }
    );
    
  }

  goProfile() {
    this.router.navigateByUrl('/profile');
  }

  cerrarMenu() {
    this.menu.close();
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
          this.form.reset();
          this.cerrarModal();
        } else {
          this.utilitiesService.errorAlert(data.payload, data.recomendation);
        }
      } else {
        this.utilitiesService.errorAlert('Error en el servidor', 'Intente mas tarde');
      }

    });
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



}
