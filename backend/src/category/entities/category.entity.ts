import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Table,
    BeforeInsert,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  @Entity('categorias')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion_categoria: string;

    constructor(
        id: number, descripcion_categoria: string,
    ){
        this.id = id;
        this.descripcion_categoria = descripcion_categoria;
    }


}
