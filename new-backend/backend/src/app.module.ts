import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsuariosService } from './usuarios/usuarios.service'
import { SwimmersModule } from './swimmers/swimmers.module';
@Module({
  imports: [UsersModule, UsuariosModule,AuthModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tesis',
    entities: [Usuario],
    autoLoadEntities: true,
    synchronize: true,
  }),
  SwimmersModule],
  
  controllers: [AppController],
  providers: [AppService,AuthModule],
})
export class AppModule {}
