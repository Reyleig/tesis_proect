import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('deportista')
export class Swimmer {
  @PrimaryGeneratedColumn()
  id_deportista: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  edad: string;

  @Column()
  celular: string;

  @Column()
  email: string;

  @Column()
  categoria: string;

  @Column()
  date: string;

  @Column()
  time: string;
}
