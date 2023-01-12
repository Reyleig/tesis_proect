import { Module } from '@nestjs/common';
import { EstilosNadoService } from './estilos-nado.service';
import { UtilityService } from '../general/utility.service';
import { EstilosNadoController } from './estilos-nado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstilosNado } from './entities/estilos-nado.entity';



@Module({
  imports: [TypeOrmModule.forFeature([EstilosNado]), 
],
  controllers: [EstilosNadoController],
  providers: [EstilosNadoService,UtilityService],
  exports: [EstilosNadoService],
})
export class EstilosNadoModule {}
