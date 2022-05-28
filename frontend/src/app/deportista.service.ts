import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeportistaService {

  deportista = {};
  constructor() { }

  setDeportista(obj) {
    this.deportista = obj;
    console.log(this.deportista);

  }


  getDeportista() {
    console.log(this.deportista);

    return this.deportista;

  }

}
