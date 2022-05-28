import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DeportistaService } from '../deportista.service';

@Component({
  selector: 'app-swimmer',
  templateUrl: './swimmer.page.html',
  styleUrls: ['./swimmer.page.scss'],
})
export class SwimmerPage implements OnInit {
  swimmers = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    public deportistas: DeportistaService
  ) { }

  ngOnInit() {
    this.swimmer();
  }


  swimmer() {

    this.http.post('http://localhost:3000/deportista',
      {}).subscribe((response: any) => {
        console.log(response);
        this.swimmers = response;
      });



  }

  tomarTiempo(obj) {
    this.deportistas.setDeportista(obj);
    this.router.navigate(['inicio/timer']);


  }

}

