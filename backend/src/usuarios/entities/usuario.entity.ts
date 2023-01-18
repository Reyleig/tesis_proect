import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usuarios')
export class Usuario {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  idrol: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  apellido: string;

  @ApiProperty()
  @Column()
  edad: string;

  @ApiProperty()
  @Column()
  fecha_nacimiento: string;

  @ApiProperty()
  @Column()
  celular: string;

  @ApiProperty()
  @Column()
  id_categoria: number;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  token: string;

  @ApiProperty()
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
