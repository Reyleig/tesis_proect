import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UtilityService } from '../general/utility.service';
import { EstilosNado } from './entities/estilos-nado.entity';
import { EstilosNadoController } from './estilos-nado.controller';
import { EstilosNadoService } from './estilos-nado.service';

describe('EstilosNadoService', () => {
    let service: EstilosNadoService;

    const mockEstilosNadoRepositoryFactory = jest.fn(() => ({
        find: jest.fn(entity => entity).mockResolvedValue({}),
        save: jest.fn(entity => entity).mockResolvedValue({}),
    }));

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EstilosNadoController],
            providers: [
                EstilosNadoService,
                UtilityService,
                {
                    provide: getRepositoryToken(EstilosNado),
                    useFactory: mockEstilosNadoRepositoryFactory,
                },
            ],
        }).compile();

        service = module.get<EstilosNadoService>(EstilosNadoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});