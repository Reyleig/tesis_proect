import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeportistaService } from '../deportista.service';
import { UserState } from '../login/store/user.state';
import { SwimmerService } from '../services/swimmer/swimmer.service';
import { AddSwimmer } from './store/swimmer.actions';
import { SwimmerState } from './store/swimmer.state';

@Component({
  selector: 'app-swimmer',
  templateUrl: './swimmer.page.html',
  styleUrls: ['./swimmer.page.scss'],
})
export class SwimmerPage implements OnInit {
  @Select(SwimmerState) swimmer$!: Observable<string>;
  @Select(UserState) user$!: Observable<any>;

  swimmer!: string;
  swimmers = [];
  token: string;
  constructor(
    private swimmerService: SwimmerService,
    private router: Router,
    public deportistas: DeportistaService,
    private store: Store
  ) {
    this.user$
      .subscribe((data: any) => {
        if (data.token) {
          this.token =  data.token;
        }
      })
      .unsubscribe();
  }

  ngOnInit() {
    this.getSwimmear();
    this.store.dispatch(new AddSwimmer('hola'));
  }

  getSwimmear() {
    this.swimmerService.getSwimmers(this.token).subscribe(response => {
      console.log(response);
      if (response) {
        console.log('entro');
        this.swimmers = response;
      }
    });
  }

  tomarTiempo(obj) {
    this.deportistas.setDeportista(obj);
    this.router.navigate(['inicio/timer']);
  }
}
