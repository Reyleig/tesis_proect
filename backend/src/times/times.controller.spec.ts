import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntrenadorDeportista } from '../usuarios/entities/entrenador_deportista.entity';
import { RolUsuario } from '../usuarios/entities/usuario-rol.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { EntrenadorDeportistaService } from '../usuarios/entrenadordeportista.service';
import { RolUsuarioService } from '../usuarios/rolusuario.service';
import { Repository } from 'typeorm';
import { UtilityService } from '../general/utility.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { TimeDeportista } from './entities/time_deportista.entity';
import { TimesService } from './times.service';
import { TimesController } from './times.controller';

let timeDeportista: Repository<TimeDeportista>

const mocktimeDeportistaRepositoryFactory = jest.fn(() => ({
    findOneBy: jest.fn(entity => entity),
    find: jest.fn(entity => entity).mockResolvedValue({}),
    findOneByToken: jest.fn(entity => entity),
    getRawMany: jest.fn(entity => entity),
    update: jest.fn(entity => entity).mockResolvedValue({}),
    save: jest.fn(entity => entity).mockResolvedValue({}),
    createQueryBuilder: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue({}),
    })),
}));
const mockUserRepositoryFactory = jest.fn(() => ({
    findOneBy: jest.fn(entity => entity),
    find: jest.fn(entity => entity).mockResolvedValue({}),
    findOneByToken: jest.fn(entity => entity),
    getRawMany: jest.fn(entity => entity),
    update: jest.fn(entity => entity).mockResolvedValue({}),
    createQueryBuilder: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue({}),
    })),
}));

const mockEntrenadorDeportistaRepositoryFactory = jest.fn(() => ({
    find: jest.fn(entity => entity).mockResolvedValue({}),
    save: jest.fn(entity => entity).mockResolvedValue({}),
}));
const mockRolUsuarioRepositoryFactory = jest.fn(() => ({
    find: jest.fn(entity => entity).mockResolvedValue({}),
    save: jest.fn(entity => entity).mockResolvedValue({}),
}));

describe('TimesService', () => {
    let timesService: TimesService;
    let usersRepository: Repository<Usuario>
    let timeDeportistaRepository: Repository<TimeDeportista>

    let dummy = {
        id: 5,
        idrol: 1,
        name: 'esebanquito',
        apellido: 'lopecito',
        edad: '25',
        fecha_nacimiento: '1994-01-01',
        celular: '3162546932',
        id_categoria: 1,
        email: 'a@a.com',
        password: 'test',
        token: 'A',
        estado: 'A',
    }
    let lstDummy = []


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TimesController],
            providers: [
                TimesService,
                UsuariosService,
                UtilityService,
                EntrenadorDeportistaService,
                RolUsuarioService,
                {
                    provide: getRepositoryToken(TimeDeportista),
                    useFactory: mocktimeDeportistaRepositoryFactory,
                },
                {
                    provide: getRepositoryToken(Usuario),
                    useFactory: mockUserRepositoryFactory,
                }
                ,
                {
                    provide: getRepositoryToken(EntrenadorDeportista),
                    useValue: mockEntrenadorDeportistaRepositoryFactory,
                },
                {
                    provide: getRepositoryToken(RolUsuario),
                    useValue: mockRolUsuarioRepositoryFactory,
                },
            ],

        }).compile();

        timesService = module.get<TimesService>(TimesService);
        usersRepository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
        timeDeportistaRepository = module.get<Repository<TimeDeportista>>(getRepositoryToken(TimeDeportista));

        lstDummy.push(dummy)

    });

    it('should be defined', () => {
        expect(timesService).toBeDefined();
    });

    it('should create a time', async () => {
        const time:TimeDeportista = {
            id: 1,
            id_deportista: 4,
            id_estilos: 1,
            fecha_registro: new Date(),
            hora_registro: '12:00:00',
            time: '00:00:00',
            banderas: '{}',
            time_milisecons: 0,
        }
        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        const response = await timesService.create(time);
        expect(response).toBeDefined();
        expect(response.status).not.toBe(null);
    });

    it('should find times stats', async () => {
        timeDeportistaRepository.createQueryBuilder = jest.fn().mockReturnValue({
            select: jest.fn().mockReturnThis(),
            innerJoin: jest.fn().mockReturnThis(),
            groupBy: jest.fn().mockReturnThis(),
            getRawMany: jest.fn().mockResolvedValue(lstDummy),
        });
        const response = await timesService.findTimesStats();
        expect(response).toBeDefined();
        expect(response.status).not.toBe(null);
    });

    it('should find times by filters', async () => {
        timeDeportistaRepository.createQueryBuilder = jest.fn().mockReturnValue({
            select: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            getRawMany: jest.fn().mockResolvedValue(lstDummy),
        });
        const response = await timesService.findTimesByFilters(1,1,new Date());
        expect(response).toBeDefined();
        expect(response.status).not.toBe(null);
    });




});
