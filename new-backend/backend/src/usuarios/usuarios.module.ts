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


@Module({
  imports: [TypeOrmModule.forFeature([Usuario,EntrenadorDeportista,RolUsuario]), 
],
  controllers: [UsuariosController],
  providers: [UsuariosService,EntrenadorDeportistaService,RolUsuarioService],
  exports: [UsuariosService,EntrenadorDeportistaService,RolUsuarioService],

})  
export class UsuariosModule {}
