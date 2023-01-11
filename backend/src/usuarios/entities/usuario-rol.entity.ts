import {
    Entity,
    Column,
    PrimaryGeneratedColumn
  } from 'typeorm';
  @Entity('rol_usuario')
  export class RolUsuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idrol: number;
  
    @Column()
    idusuario: number;
  

    constructor(
        idusuario: number,
     idrol: number,

    ) {
      this.idusuario = idusuario;
      this.idrol = idrol;

    }
  }
  