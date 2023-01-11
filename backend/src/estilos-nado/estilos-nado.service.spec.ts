import { Test, TestingModule } from '@nestjs/testing';
import { EstilosNadoService } from './estilos-nado.service';

describe('EstilosNadoService', () => {
  let service: EstilosNadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstilosNadoService],
    }).compile();

    service = module.get<EstilosNadoService>(EstilosNadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
