import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DataSqliteService } from '../services/sqlite/data-sqlite.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userForm: FormGroup = new FormGroup({

    email : new  FormControl(),
    password : new  FormControl(),

  });
  user:any=[];


  constructor(
    private loginService: LoginService,
    private router: Router,
    private sqlite: SQLite,
    private dataSqliteService:DataSqliteService

  ) { }

  ngOnInit() {

  }

  getToken(){
    this.dataSqliteService.getUser().then(resp =>{
      this.user=resp
    }).catch(err =>{
      console.log(err);
      
    })

    console.log(this.user);
    
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
