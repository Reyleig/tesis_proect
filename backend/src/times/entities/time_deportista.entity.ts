import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('time_deportista')
export class TimeDeportista {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_deportista: number;

  @Column()
  id_estilos: number;

  @Column({ type: 'date', default: () => 'curdate()', })
  fecha_registro: Date;

  @Column({ type: 'time', default: () => 'curtime()', })
  hora_registro: string;

  @Column()
  time: string;

  @Column()
  banderas: string;

  @Column({ type: 'numeric', default: () => 0, })
  time_milisecons: number;

  constructor(
    id: number,
    id_deportista: number,
    id_estilos: number,
    fecha_registro: Date,
    hora_registro: string,
    time: string,
    banderas: string,
  ) {
    this.id = id;
    this.id_deportista = id_deportista;
    this.id_estilos = id_estilos;
    this.fecha_registro = fecha_registro;
    this.hora_registro = hora_registro;
    this.time = time;
    this.banderas = banderas;
  }
}
