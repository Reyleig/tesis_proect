import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { EntrenadorDeportistaService } from 'src/usuarios/entrenadordeportista.service';
import { RolUsuarioService } from 'src/usuarios/rolusuario.service';
import { TaskController } from './task.controller';
import { UtilityService } from '../general/utility.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RolUsuario } from 'src/usuarios/entities/usuario-rol.entity';
import { EntrenadorDeportista } from 'src/usuarios/entities/entrenador_deportista.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Task,Usuario,EntrenadorDeportista,RolUsuario]),
  ],
  controllers: [TaskController],
  providers: [TaskService, UtilityService,UsuariosService,EntrenadorDeportistaService,RolUsuarioService],
  exports: [TaskService],

})
export class TaskModule { }

