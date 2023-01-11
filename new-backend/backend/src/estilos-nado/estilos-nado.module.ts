import { Module } from '@nestjs/common';
import { EstilosNadoService } from './estilos-nado.service';
import { EstilosNadoController } from './estilos-nado.controller';

@Module({
  controllers: [EstilosNadoController],
  providers: [EstilosNadoService]
})
export class EstilosNadoModule {}
