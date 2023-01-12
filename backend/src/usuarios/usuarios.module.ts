import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { EntrenadorDeportista } from './entities/entrenador_deportista.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { EntrenadorDeportistaService } from './entrenadordeportista.service';
import { RolUsuario } from './entities/usuario-rol.entity';
import { RolUsuarioService } from './rolusuario.service';
import { UtilityService } from '../general/utility.service';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario,EntrenadorDeportista,RolUsuario]), 
],
  controllers: [UsuariosController],
  providers: [UsuariosService,EntrenadorDeportistaService,RolUsuarioService,UtilityService],
  exports: [UsuariosService],

})  
export class UsuariosModule {}
