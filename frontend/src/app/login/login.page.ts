import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userForm: UntypedFormGroup = new UntypedFormGroup({

    email : new  UntypedFormControl(),
    password : new  UntypedFormControl(),

  });
  user:any=[];


  constructor(
    private loginService: LoginService,
    private router: Router,

  ) { }

  ngOnInit() {

  }





login(){
  this.loginService.login(this.userForm.value).subscribe(response => {
    console.log(response);
    if(response){
      console.log('entro');
  //     this.sqlite.create({
  //       name: 'data.db',
  //       location: 'default'
  //     }).then((db: SQLiteObject) => {
  //         db.executeSql('create table danceMoves(name VARCHAR(32))', [])
  //           .then(() => console.log('Executed SQL'))
  //           .catch(e => console.log(e));
  //       })
  //       .catch(e => console.log(e));
  //   }
  }
      this.router.navigateByUrl('/inicio');

  
    
  })


  }
}
