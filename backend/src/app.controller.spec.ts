import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UtilityService } from './general/utility.service';
import { EntrenadorDeportista } from './usuarios/entities/entrenador_deportista.entity';
import { RolUsuario } from './usuarios/entities/usuario-rol.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { EntrenadorDeportistaService } from './usuarios/entrenadordeportista.service';
import { RolUsuarioService } from './usuarios/rolusuario.service';
import { UsuariosService } from './usuarios/usuarios.service';

describe('AppController', () => {
  let appController: AppController;
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
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        JwtService,
        UsuariosService,
        UtilityService,
        EntrenadorDeportistaService,
        RolUsuarioService,
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

    appController = app.get<AppController>(AppController);
  });

  it ('should be defined', () => {
    expect(appController).toBeDefined();
  });

});
