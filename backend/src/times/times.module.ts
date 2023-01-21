import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimesController } from './times.controller';
import { TimesService } from './times.service';
import { TimeDeportista } from './entities/time_deportista.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { EntrenadorDeportistaService } from '../usuarios/entrenadordeportista.service';
import { RolUsuarioService } from '../usuarios/rolusuario.service';
import { RolUsuario } from '../usuarios/entities/usuario-rol.entity';
import { EntrenadorDeportista } from '../usuarios/entities/entrenador_deportista.entity';
import { UtilityService } from '../general/utility.service';


@Module({
  imports:[TypeOrmModule.forFeature([TimeDeportista,Usuario,EntrenadorDeportista,RolUsuario]), ],
  controllers: [TimesController],
  providers: [TimesService,UsuariosService,EntrenadorDeportistaService,RolUsuarioService,UtilityService]
})
export class TimesModule {}
