import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private http: HttpClient



  ) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/credenciales')
    .subscribe(res=>{
console.log(res);
    });
  }

}
