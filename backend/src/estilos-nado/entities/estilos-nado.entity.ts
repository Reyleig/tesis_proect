import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Table,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity('estilos_nado')
export class EstilosNado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  metros: string;

  constructor(
    id: number,
    descripcion: string,
    metros: string,
  ) {
    this.id = id;
    this.descripcion = descripcion;
    this.metros = metros;
  }
}
