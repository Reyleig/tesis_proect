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
  idrol: number;

  @Column()
  name: string;

  @Column()
  apellido: string;

  @Column()
  edad: string;

  @Column()
  fecha_nacimiento: string;

  @Column()
  celular: string;

  @Column()
  id_categoria: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @Column()
  estado: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  constructor(
    name: string,
    apellido: string,
    edad: string,
    fecha_nacimiento: string,
    celular: string,
    id_categoria: number,
    email: string,
    password: string,
    token: string,
    estado: string,
  ) {
    this.name = name;
    this.apellido = apellido;
    this.edad = edad;
    this.fecha_nacimiento = fecha_nacimiento;
    this.celular = celular;
    this.id_categoria = id_categoria;
    this.email = email;
    this.password = password;
    this.token = token;
    this.estado = estado;
  }
}
