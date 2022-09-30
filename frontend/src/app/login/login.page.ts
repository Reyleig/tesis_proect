import { Component, OnDestroy, OnInit } from '@angular/core';
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
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  @Select(UserState.token) token$!: Observable<string>;
  token!: string;
  private valueSuscription: Subscription;

  // const phone = new FormControl('', Validators.compose([
  //   Validators.required,
  //   PhoneValidator.invalidCountryPhone(country)
  // ]));

  public userForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', { nonNullable: true }),
    password: new UntypedFormControl('', { nonNullable: true }),
  });

  ishidden = false;
  user: any;
  // SHA256 = require("crypto-js/sha256");
 hashDigest = sha256('Message');
 hmacDigest = Base64.stringify(hmacSHA512('Message', 'Secret Passphrase'));

  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store,
    private utilitiesService: UtilitiesService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.validarToken();
    console.log( sha256('Message'));

    console.log(this.hmacDigest);
    console.log('asdfasdf');
  }
  ngOnDestroy() {
    this.valueSuscription.unsubscribe();


  }

  validarToken() {
    setTimeout(() => {
      this.token$.subscribe((data: any) => {
        if (data.token) {
          console.log(data.token);

          this.router.navigateByUrl('/inicio');
        } else {
          this.ishidden = true;
        }
      }).unsubscribe;
      console.log(this.ishidden);
    }, 2000);
  }

  addUser(
    token: string | null,
    username: string | null,
    idrol: number | null
  ): void {
    if (token) {
      console.log(token, username, idrol);

      this.store.dispatch(new AddUser(token, username, idrol));
    }
  }

  login() {
    //encriptar password con sha256
    const password = this.userForm.get('password').value;
    const hashPassword = sha256(password);
    const hashPasswordBase64 = Base64.stringify(hashPassword);
// agregar al formulario la contraceña encriptada
    this.userForm.get('password').setValue(hashPasswordBase64);
    console.log(this.userForm.value);

    this.loginService.login(this.userForm.value).subscribe((response) => {
      if (response) {
        this.addUser(response.access_token, response.username, response.idrol);
        // this.router.navigateByUrl('/inicio');
      } else {
        this.utilitiesService.errorAlert(
          'Credenciales invalidas',
          'Intente de nuevo'
        );
      }
    });
  }
}
