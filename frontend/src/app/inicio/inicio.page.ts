import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  username: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.user$.subscribe((data: any) => {
      if (data.token) {
        this.username = data.username;
      }
    }).unsubscribe;
  }

  opctionsMenu(opcion) {
    switch (opcion) {
      case 1:
        this.router.navigateByUrl('/swimmer');
        break;
      case 2:
        this.router.navigateByUrl('/timer');
        break;
      case 3:
        this.router.navigateByUrl('/training');
        break;
      case 4:
        this.router.navigateByUrl('/stats');
        break;
      default:
        break;
    }
  }
}
