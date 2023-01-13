import { Entity, Column, PrimaryGeneratedColumn, Table, BeforeInsert, } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { type } from 'os';

@Entity('task')
export class Task {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_usuario: number;

    @Column()
    titulo_tarea: string;

    @Column()
    descripcion_tarea: string;

    @Column({ type: 'date', default: () => 'curdate()', })
    fecha_registro: Date;

    constructor(
        id_usuario: number,
        titulo_tarea: string,
        descripcion_tarea: string,
    ) {
        this.id_usuario = id_usuario;
        this.titulo_tarea = titulo_tarea;
        this.descripcion_tarea = descripcion_tarea;
    }

}
