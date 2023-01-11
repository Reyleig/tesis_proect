import { Test, TestingModule } from '@nestjs/testing';
import { EstilosNadoController } from './estilos-nado.controller';
import { EstilosNadoService } from './estilos-nado.service';

describe('EstilosNadoController', () => {
  let controller: EstilosNadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstilosNadoController],
      providers: [EstilosNadoService],
    }).compile();

    controller = module.get<EstilosNadoController>(EstilosNadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
