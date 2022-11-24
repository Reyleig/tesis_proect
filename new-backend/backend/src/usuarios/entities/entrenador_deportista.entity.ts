import {
     Entity,
     Column,
     PrimaryColumn,
   } from 'typeorm';
   @Entity('entrenador_deportista')
   export class EntrenadorDeportista {
     @PrimaryColumn()
     iddeportista: number;
   
     @PrimaryColumn()
     identrenador: number;
   

     constructor(
      identrenador: number,
      iddeportista: number,

     ) {
       this.iddeportista = iddeportista;
       this.identrenador = identrenador;

     }
   }
   