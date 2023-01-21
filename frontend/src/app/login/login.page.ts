import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  UntypedFormControl,
  UntypedFormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { AddUser } from './store/user.actions';
import { Observable, Subscription } from 'rxjs';
import { UserState } from './store/user.state';
import { UtilitiesService } from '../services/general/utilities.service';
import { environment } from 'src/environments/environment';
import { IonModal } from '@ionic/angular';
import { InicioService } from '../services/inicio/inicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  @Select(UserState.token) token$!: Observable<string>;
  @ViewChild(IonModal) modal: IonModal;

  token!: string;
  form = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
  });

  private valueSuscription: Subscription;

  public userForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', { nonNullable: true }),
    password: new UntypedFormControl('', { nonNullable: true }),
  });

  ishidden = false;
  user: any;
  isModalOpen = false;
  titleModal: string = 'Cambiar password';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store,
    private utilitiesService: UtilitiesService,
    private formBuilder: FormBuilder,
    private inicioService: InicioService
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    
    this.validarToken();
  }

  validarToken() {
    setTimeout(() => {
      this.token$
        .subscribe((data: any) => {
          if (data.token) {
            if (data.idrol === 1) {
              this.router.navigateByUrl('/user-management');
            } else {
              this.router.navigateByUrl('/inicio');
            }
          }
          this.ishidden = true;
        })
        .unsubscribe();
    }, 2000);
  }

  addUser(
    token: string | null,
    username: string | null,
    idrol: number | null
  ): void {
    if (token) {
      this.store.dispatch(new AddUser(token, username, idrol));
    }
  }

  login() {
    const password = this.userForm.get('password').value;
    this.userForm.get('password').setValue(this.utilitiesService.encrytarPassword(this.userForm.get('password').value));
    this.loginService.login(this.userForm.value).subscribe((response) => {
      if (response) {
        if (this.userForm.value.email == password) {
          this.abrirModal();
          console.log(response);
          
          this.token = response.access_token;
          return;
        } else {
          this.addUser(response.access_token, response.username, response.idrol);

          this.userForm.get('password').setValue('');
          this.userForm.get('email').setValue('');

          if (response.idrol == 1) {
            this.router.navigateByUrl('/user-management');
          } else {
            this.router.navigateByUrl('/inicio');
          }
        }

      } else {
        this.userForm.get('password').setValue(password);
      }
    },
      (error) => {
        this.utilitiesService.errorAlert(
          error.error.message, 'Intente de nuevo'
        );
        this.userForm.get('password').setValue(password);
      });
  }

  cambiarPassword() {
    //validar si la nueva contraceña es igual a la confirmacion
    if (this.form.value.newPassword !== this.form.value.confirmPassword) {
      this.utilitiesService.infoAlert('Las contraseñas no coinciden');
      return;
    }

    let cambiarPassword = {
      token: this.token,
      actualPassword: this.utilitiesService.encrytarPassword(this.userForm.value.email),
      newPassword: this.cambiarPassword = this.utilitiesService.encrytarPassword(this.form.value.newPassword),
    }

    console.log(cambiarPassword);

    this.loginService.cambiarPassword(cambiarPassword,this.token).subscribe((data: any) => {
      if (data) {
        if (data.status === 200) {
          this.utilitiesService.infoAlert(data.payload);
          this.cerrarModal();
          this.router.navigateByUrl('/inicio');
          this.userForm.reset();
        } else {
          this.utilitiesService.errorAlert(data.payload, data.recomendation);
        }
      } else {
        this.utilitiesService.errorAlert('Error en el servidor', 'Intente mas tarde');
      }

    });
  }


  abrirModal() {
    this.isModalOpen = true;
    
  }
  cerrarModal() {
    this.isModalOpen = false;
    this.modal.dismiss();
  }


  ngOnDestroy() {
    this.valueSuscription.unsubscribe();
  }
}
