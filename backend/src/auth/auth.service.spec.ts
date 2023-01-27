import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { Repository, UpdateResult } from 'typeorm';
import { UtilityService } from '../general/utility.service';
import { EntrenadorDeportista } from '../usuarios/entities/entrenador_deportista.entity';
import { RolUsuario } from '../usuarios/entities/usuario-rol.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { EntrenadorDeportistaService } from '../usuarios/entrenadordeportista.service';
import { RolUsuarioService } from '../usuarios/rolusuario.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
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

let dummyUser: Usuario = new Usuario(
  '1',
  'eseban',
  'lopez',
  '25',
  '1994-01-01',
  1,
  'a@a.com',
  'tets',
  'test',
  'A',
);
  let service: AuthService;
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
let jwtService: JwtService;
let usuarioRepository: Repository<Usuario>;
let usuariosService: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usuarioRepository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
    usuariosService = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login', () => {
    service.validateUser = jest.fn().mockResolvedValue(dummyUser);
    const payload : CreateUsuarioDto = new CreateUsuarioDto();
    payload.email = 'a@a.com';
    payload.password = 'test';
    jwtService.sign = jest.fn().mockReturnValue('A');
    usuarioRepository.update = jest.fn().mockResolvedValue({UpdateResult});
    expect(service.login(payload)).not.toBe(null);
  });
  
});
