import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Table,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  idrol: number;

  @Column()
  token: string;

  @Column()
  apellido: string;

  @Column()
  edad: string;

  @Column()
  celular: string;

  @Column()
  categoria: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  estado: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  constructor(
    id: number,
    name: string,
    email: string,
    pass: string,
    idrol: number,
    token: string,
    apellido: string,
    edad: string,
    celular: string,
    categoria: string,
    date: string,
    time: string,
    estado: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = pass;
    this.idrol = idrol;
    this.token = token;
    this.apellido = apellido;
    this.edad = edad;
    this.celular = celular;
    this.categoria = categoria;
    this.date = date;
    this.time = time;
    this.estado = estado;
  }
}
