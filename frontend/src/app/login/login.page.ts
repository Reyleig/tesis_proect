import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userForm: FormGroup = new FormGroup({

    email : new  FormControl(),
    Password : new  FormControl(),

  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {

  }

login(){
  console.log(this.userForm.value);
  this.http.post('http://localhost:3000/credenciales',
  this.userForm.value).subscribe(response => {
    console.log(response);
    if(response){
      console.log('entro');
      this.router.navigateByUrl('/inicio');

    }
  })



}



}
