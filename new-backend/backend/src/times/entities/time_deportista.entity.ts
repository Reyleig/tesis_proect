import {
    Entity,
    Column,
    PrimaryColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  @Entity('time_deportista')
  export class TimeDeportista {
    @Column()
    id_deportista: number;

    @Column({ type: 'timestamp', default: () => 'NOW()',})
    fecha_registro: Date;

    @Column()
    banderas: string;

    @Column()
    time: string;

    @PrimaryGeneratedColumn()
    id: number;

    constructor(
        id_deportista: number,
        fecha_registro: Date,
        banderas: string,
        time: string,
        id: number,

    ) {
        this.id_deportista = id_deportista;
        this.fecha_registro = fecha_registro;
        this.banderas = banderas;
        this.time = time;
        this.id = id;
    }
  }
  