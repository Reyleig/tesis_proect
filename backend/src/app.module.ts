import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usuario } from './usuarios/entities/usuario.entity';
import { EstilosNado } from './estilos-nado/entities/estilos-nado.entity';
import { EntrenadorDeportista } from './usuarios/entities/entrenador_deportista.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from 'src/auth/auth.module';
import { TimesModule } from './times/times.module';
import { TimeDeportista } from './times/entities/time_deportista.entity';
import { RolUsuario } from './usuarios/entities/usuario-rol.entity';
import { EstilosNadoModule } from './estilos-nado/estilos-nado.module';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';

@Module({
  imports: [UsuariosModule,AuthModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'tesis',
    entities: [Usuario,EstilosNado,EntrenadorDeportista,TimeDeportista,RolUsuario,Category],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  }),
  TimesModule,
  EstilosNadoModule,
  TaskModule,
  CategoryModule],
  
  controllers: [AppController],
  providers: [AppService,AuthModule],
})
export class AppModule {}
