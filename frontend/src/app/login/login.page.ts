import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntypedFormControl, UntypedFormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { AddToken } from './store/user.actions';
import { Observable, Subscription } from 'rxjs';
import { UserState } from './store/user.state';
import { withLatestFrom } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { UtilitiesService } from '../services/general/utilities.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  // @Select(UserState.token) token$!: Observable<string>;
  token!: string;
  private valueSuscription: Subscription;

  // const phone = new FormControl('', Validators.compose([
  //   Validators.required,
  //   PhoneValidator.invalidCountryPhone(country)
  // ]));
    
  public userForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', {nonNullable: true}),
    password: new UntypedFormControl('', {nonNullable: true}),

  });


  user: any = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store,
    private utilitiesService: UtilitiesService,
    private formBuilder: FormBuilder,

  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
   })
  }


  

  ngOnInit() {
  }
  ngOnDestroy() {
    this.valueSuscription.unsubscribe();
  }

  addToken(token: string | null , username:string | null ): void {
    if (token) {      
      this.store.dispatch(new AddToken(token,username));
    }
  }

  login() {
    this.loginService.login(this.userForm.value).subscribe(response => {
      if (response) {      
        this.addToken(response.access_token, response.username)
        this.router.navigateByUrl('/inicio');
      }else{
        this.utilitiesService.errorAlert('Credenciales invalidas','Intente de nuevo');
      }
    })
  }


}
