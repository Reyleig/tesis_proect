import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from '../login/store/user.state';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

    
@Select(UserState) user$!: Observable<any>;
username:string;

  constructor() { }

  ngOnInit() {
    this.user$.subscribe((data: any) => {
      if (data.token) {
        this.username=data.username;
      } 
    }).unsubscribe;    
  }

}
