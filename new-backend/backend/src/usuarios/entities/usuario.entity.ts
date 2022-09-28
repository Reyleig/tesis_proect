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
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = pass;
    this.idrol = idrol;
    this.token = token;
  }
}
