import { Entity, Column, PrimaryGeneratedColumn, Table, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  constructor(id: number, email: string, pass: string,token:string) {
    this.id = id;
    this.email = email;
    this.password = pass;
    this.token= token;
  }
}
