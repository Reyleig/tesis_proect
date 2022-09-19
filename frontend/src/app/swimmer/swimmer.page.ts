import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeportistaService } from '../deportista.service';
import { SwimmerService } from '../services/swimmer/swimmer.service';

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

