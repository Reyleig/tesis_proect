import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimesController } from './times.controller';
import { TimesService } from './times.service';
import { TimeDeportista } from './entities/time_deportista.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { EntrenadorDeportistaService } from 'src/usuarios/entrenadordeportista.service';
import { RolUsuarioService } from 'src/usuarios/rolusuario.service';
import { RolUsuario } from 'src/usuarios/entities/usuario-rol.entity';
import { EntrenadorDeportista } from 'src/usuarios/entities/entrenador_deportista.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TimeDeportista,Usuario,EntrenadorDeportista,RolUsuario]), ],
  controllers: [TimesController],
  providers: [TimesService,UsuariosService,EntrenadorDeportistaService,RolUsuarioService]
})
export class TimesModule {}
