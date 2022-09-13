import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { AddToken } from './store/user.actions';
import { Observable, Subscription } from 'rxjs';
import { UserState } from './store/user.state';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  @Select(UserState.token) token$!: Observable<string>;
  token!: string;
  private valueSuscription: Subscription;


  public userForm: UntypedFormGroup = new UntypedFormGroup({

    email: new UntypedFormControl(),
    password: new UntypedFormControl(),

  });
  user: any = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store

  ) {
    this.valueSuscription = this.token$.subscribe((token: string) => {
      this.token = token
    })
  }

  ngOnInit() {
    this.addToken("asdfsda");
  }
  ngOnDestroy() {
    this.valueSuscription.unsubscribe();
  }

  addToken(token: string | null): void {
    if (token) {      
      this.store.dispatch(new AddToken(token));
    }
  }

  login() {
    this.loginService.login(this.userForm.value).subscribe(response => {
      console.log(response);
      if (response) {
        this.addToken(response.access_token)        
      }
      this.router.navigateByUrl('/inicio');
    })


  }
}
