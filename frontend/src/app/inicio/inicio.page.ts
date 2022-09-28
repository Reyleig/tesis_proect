import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ResetUser } from '../login/store/user.actions';
import { UserState } from '../login/store/user.state';
import { UtilitiesService } from '../services/general/utilities.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @Select(UserState) user$!: Observable<any>;
  username: string;

  constructor(
    private router: Router,
    private store: Store,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit() {
    this.user$.subscribe((data: any) => {
      if (data.token) {
        this.username = data.username;
      }
    }).unsubscribe();
  }

  logout() {
    this.utilitiesService
      .infoAlert('Desea cerrar sesion')
      .then((result) => {
        if (result.role === 'confirm') {
          this.store.dispatch(new ResetUser());
          this.router.navigateByUrl('/login');
        }
      });
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
