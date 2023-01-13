import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { EstilosNado } from './estilos-nado/entities/estilos-nado.entity';
import { EntrenadorDeportista } from './usuarios/entities/entrenador_deportista.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from 'src/auth/auth.module';
import { SwimmersModule } from './swimmers/swimmers.module';
import { TimesModule } from './times/times.module';
import { TimeDeportista } from './times/entities/time_deportista.entity';
import { RolUsuario } from './usuarios/entities/usuario-rol.entity';
import { EstilosNadoModule } from './estilos-nado/estilos-nado.module';
import { ToDoModule } from './to-do/to-do.module';
import { TaskModule } from './task/task.module';
@Module({
  imports: [UsersModule, UsuariosModule,AuthModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tesis',
    entities: [Usuario,EstilosNado,EntrenadorDeportista,TimeDeportista,RolUsuario],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  }),
  SwimmersModule,
  TimesModule,
  EstilosNadoModule,
  ToDoModule,
  TaskModule],
  
  controllers: [AppController],
  providers: [AppService,AuthModule],
})
export class AppModule {}
