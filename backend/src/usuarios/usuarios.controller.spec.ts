import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { INestApplication } from '@nestjs/common';
import { createQueryBuilder, DataSource, Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UtilityService } from '../general/utility.service';
import { RolUsuarioService } from './rolusuario.service';
import { EntrenadorDeportistaService } from './entrenadordeportista.service';
import { EntrenadorDeportista } from './entities/entrenador_deportista.entity';
import { RolUsuario } from './entities/usuario-rol.entity';
import { GenericDto } from '../general/generic.dto';






  


describe('UsuariosService', () => {

    const estadoActivo: string = 'A';
    let usuariosService: UsuariosService;
    let usersRepository: Repository<Usuario>
    let dummy:Usuario = new Usuario(
        '5',
        'esebanquito',
        'lopecito',
        '25',
        '1994-01-01',
        1,
        '3162546932',
        'tets',
        'test',
        'A',
    );

    let lstDummy:Usuario[] = [];

    
const mockUserRepositoryFactory = jest.fn(() => ({
    findOneBy: jest.fn(entity => entity),
    find: jest.fn(entity => entity).mockResolvedValue({}),
    findOneByToken: jest.fn(entity => entity),
    getRawMany: jest.fn(entity => entity),
    createQueryBuilder: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue({}),
      })),
  }));

    const createQueryBuilder: any = {
        select: jest.fn().mockImplementation(() => {
          return createQueryBuilder
        }),
        addSelect: jest.fn().mockImplementation(() => {
          return createQueryBuilder
        }),
        groupBy: jest.fn().mockImplementation(() => {
          return createQueryBuilder
        }),
        where: jest.fn().mockImplementation(() => {
          return createQueryBuilder
        }),
      }
  
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService, 
        EntrenadorDeportistaService,
        RolUsuarioService,
        UtilityService,
        {
            provide: getRepositoryToken(Usuario),
            useFactory: mockUserRepositoryFactory,
        }
        ,
        {
            provide: getRepositoryToken(EntrenadorDeportista),
            useValue: mockUserRepositoryFactory,
        },
        {
            provide: getRepositoryToken(RolUsuario),
            useValue: mockUserRepositoryFactory,
        },

        ],
    }).compile();
    usuariosService = module.get<UsuariosService>(UsuariosService);
    usersRepository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));

    lstDummy.push(dummy);


  });


    it('should be defined', () => {
        expect(usuariosService).toBeDefined();
    });

    it('find all coachs', () => {
        const response = usuariosService.findAllCoachs(estadoActivo);
        expect(response).not.toBe(null);
    });

    it('find coacht', () => {
        const response = usuariosService.findCoachByToken(estadoActivo);
        expect(response).not.toBe(null);

    });

    it('find one by id', () => {
        const response = usuariosService.findOneById(1);
        expect(response).not.toBe(null);

    });

    it('find swimmers by id training', () => {
        usersRepository.find= jest.fn().mockResolvedValue(lstDummy);
        const response = usuariosService.findSwimmersByIdTraining('5', estadoActivo);
        expect(response).not.toBe(null);
    });

    // async inactivateSwimmer(token: string, idSwimmer: number, estado: string): Promise<any> {
    //     estado = estado == 'true' ? 'I' : 'A';
    //     let usuario: Usuario = await this.findOneById(idSwimmer);
    //     usuario.estado = estado;
    //     await this.updateUserToken(usuario);
    
    //     return usuario;
    //   }

    // it('inactivate swimmer', () => {
    //     usersRepository.find= jest.fn().mockResolvedValue(dummy);
    //     usersRepository.update= jest.fn().mockResolvedValue(dummy);
    //     const response = usuariosService.inactivateSwimmer(1, 'A');
    //     expect(response).not.toBe(null);
    // });




});
