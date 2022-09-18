import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DeportistaService } from '../deportista.service';
import { SwimmerService } from '../services/swimmer/swimmer.service';
import { Observable } from 'rxjs';
import { UserState } from '../login/store/user.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-swimmer',
  templateUrl: './swimmer.page.html',
  styleUrls: ['./swimmer.page.scss'],
})



export class SwimmerPage implements OnInit {

  swimmers = [];
  constructor(
    private swimmerService: SwimmerService,
    private router: Router,
    public deportistas: DeportistaService
  ) { }

  
  ngOnInit() {
    this.swimmer();
  }


  swimmer() {


    this.swimmerService.getSwimmers().subscribe(response => {
      console.log(response);
      if(response){
        console.log('entro');
        this.swimmers = response;

      }
    })
  }

  tomarTiempo(obj) {
    this.deportistas.setDeportista(obj);
    this.router.navigate(['inicio/timer']);


  }

}

