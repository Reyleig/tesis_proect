import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, MenuController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ResetUser } from 'src/app/login/store/user.actions';
import { UserState } from 'src/app/login/store/user.state';
import { ResetSwimmer } from 'src/app/swimmer/store/swimmer.actions';
import { SwimmerState } from 'src/app/swimmer/store/swimmer.state';
import { ResetTimer } from 'src/app/timer/store/timer.actions';
import { UtilitiesService } from 'src/app/services/general/utilities.service';
import { CoachService } from 'src/app/services/admin/coach/coach.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {
  @Select(UserState) user$!: Observable<any>;
  @Select(SwimmerState) swimmer$!: Observable<any>;
  @ViewChild(IonModal) modal: IonModal;

  coachs = [];

  constructor(
    private menu: MenuController,
    private router: Router,
    private store: Store,
    private utilitiesService: UtilitiesService,
    private coachService: CoachService

  ) { }

  ngOnInit() {
    console.log('ngOnInit');
    
    this.getAllCoaches();
  }

  getAllCoaches() {
    this.coachs = [];
    console.log('getAllCoaches');
    
    this.coachService.getAllCoach().subscribe((data) => {

    }
    ).unsubscribe();
  }

  goProfile() {
    this.router.navigateByUrl('/profile');
  }

  cerrarMenu() {
    this.menu.close();
  }

  logout() {
    this.utilitiesService
      .infoAlert('Desea cerrar sesion')
      .then((result) => {
        if (result.role === 'confirm') {

          this.store.dispatch(new ResetUser());
          this.store.dispatch(new ResetSwimmer());
          this.store.dispatch(new ResetTimer());

          this.router.navigateByUrl('/login');
        }
      });
  }


}
