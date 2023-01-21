import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UtilityService } from '../general/utility.service';
import { RolUsuarioService } from './rolusuario.service';
import { EntrenadorDeportistaService } from './entrenadordeportista.service';
import { EntrenadorDeportista } from './entities/entrenador_deportista.entity';
import { RolUsuario } from './entities/usuario-rol.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { EntrenadorDeportistaDto } from './dto/entrenador-deportista.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsuariosController } from './usuarios.controller';

describe('UsuariosService', () => {

    const estadoActivo: string = 'A';
    let usuariosService: UsuariosService;
    let usersRepository: Repository<Usuario>
    let rolUsuarioRepository: Repository<RolUsuario>
    let entrenadorDeportistaRepository: Repository<EntrenadorDeportista>
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
    let dummyCoach = {
        id: 5,
        idrol: 2,
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
        '5',
        'esebanquito',
        'lopecito',
        '25',
        '1994-01-01',
        1,
        'a@a.com',
        'tets',
        'test',
        'A',
    );

    let dummyCreateUser: CreateUsuarioDto = new CreateUsuarioDto(
    );
    dummyCreateUser.name = 'esebanquito';
    dummyCreateUser.apellido = 'lopecito';
    dummyCreateUser.edad = '25';
    dummyCreateUser.fecha_nacimiento = '1994-01-01';
    dummyCreateUser.id_categoria = 1;
    dummyCreateUser.celular = '3162546932';
    dummyCreateUser.email = 'a@a.com';
    dummyCreateUser.password = 'test';
    dummyCreateUser.estado = 'A';




    let lstDummy: any[] = [];


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
            controllers: [UsuariosController],
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
                    useValue: mockEntrenadorDeportistaRepositoryFactory,
                },
                {
                    provide: getRepositoryToken(RolUsuario),
                    useValue: mockRolUsuarioRepositoryFactory,
                },

            ],
        }).compile();
        usuariosService = module.get<UsuariosService>(UsuariosService);
        usersRepository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
        rolUsuarioRepository = module.get<Repository<RolUsuario>>(getRepositoryToken(RolUsuario));
        entrenadorDeportistaRepository = module.get<Repository<EntrenadorDeportista>>(getRepositoryToken(EntrenadorDeportista));

        lstDummy.push(dummy);


    });


    it('should be defined', () => {
        expect(usuariosService).toBeDefined();
    });

    it('find all coachs', () => {
        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        const response = usuariosService.findAllCoachs(estadoActivo);
        expect(response).not.toBe(null);
    });

    it('find coacht', () => {
        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        const response = usuariosService.findCoachByToken(estadoActivo);
        expect(response).not.toBe(null);

    });

    it('find one by id', () => {
        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        const response = usuariosService.findOneById(1);
        expect(response).not.toBe(null);

    });

    it('find swimmers by id training', () => {
        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        const response = usuariosService.findSwimmersByIdTraining('5', estadoActivo);
        expect(response).not.toBe(null);
    });

    it('inactivate swimmer', () => {
        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        usersRepository.update = jest.fn().mockResolvedValue(dummy);
        const response = usuariosService.inactivateSwimmer(dummy.id, 'A');
        expect(response).not.toBe(null);
    });

    it('update user token', () => {
        usersRepository.update = jest.fn().mockResolvedValue(lstDummy);
        const response = usuariosService.updateUserToken(dummyUser);
        expect(response).not.toBe(null);
    });

    it('create swimmer', () => {
        let entrenadorDeportista: EntrenadorDeportistaDto = new EntrenadorDeportistaDto();
        entrenadorDeportista.iddeportista = 1;
        entrenadorDeportista.identrenador = 5;


        usersRepository.save = jest.fn().mockResolvedValue(dummyCreateUser);
        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        entrenadorDeportistaRepository.save = jest.fn().mockResolvedValue(entrenadorDeportista);

        const response = usuariosService.createSwimmer(dummyCreateUser);
        expect(response).not.toBe(null);
    });

    it('update swimmer', () => {
        const response = usuariosService.updateSwimmer(dummy);
        expect(response).not.toBe(null);
    });

    it('update password', () => {
        let dummyUpdatePassword: UpdateUserPasswordDto = new UpdateUserPasswordDto();
        dummyUpdatePassword.actualPassword = '123456';
        dummyUpdatePassword.newPassword = '123456';
        dummyUpdatePassword.token = '123';
        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        usersRepository.update = jest.fn().mockResolvedValue(dummy);
        const response = usuariosService.updatePassword(dummyUpdatePassword);
        expect(response).not.toBe(null);
    });

    it('create user', () => {
        let dummyCreateUser: CreateUsuarioDto = new CreateUsuarioDto();
        dummyCreateUser.tokenCreater = '123';
        dummyCreateUser.name = 'name';
        dummyCreateUser.apellido = 'apellido';
        dummyCreateUser.edad = 'edad';
        dummyCreateUser.fecha_nacimiento = 'fecha_nacimiento';
        dummyCreateUser.celular = 'celular';
        dummyCreateUser.id_categoria = 1;
        dummyCreateUser.email = 'a@b.com';
        dummyCreateUser.password = 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=';
        dummyCreateUser.token = '123';
        dummyCreateUser.estado = 'A';

        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        jest.spyOn(usuariosService, 'findOne').mockImplementation(() => undefined);
        usersRepository.save = jest.fn().mockResolvedValue(dummyCreateUser);


        const response = usuariosService.create(dummyCreateUser);
        expect(response).not.toBe(null);

    });

    it('create user coach', () => {
        let dummyCreateUser: CreateUsuarioDto = new CreateUsuarioDto();
        dummyCreateUser.tokenCreater = '123';
        dummyCreateUser.name = 'name';
        dummyCreateUser.apellido = 'apellido';
        dummyCreateUser.edad = 'edad';
        dummyCreateUser.fecha_nacimiento = 'fecha_nacimiento';
        dummyCreateUser.celular = 'celular';
        dummyCreateUser.id_categoria = 1;
        dummyCreateUser.email = 'a@b.com';
        dummyCreateUser.password = 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=';
        dummyCreateUser.token = '123';
        dummyCreateUser.estado = 'A';
        //limpiar lista
        lstDummy = [];
        lstDummy.push(dummyCoach);

        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        jest.spyOn(usuariosService, 'findOne').mockImplementation(() => undefined);
        usersRepository.save = jest.fn().mockResolvedValue(dummyCreateUser);


        const response = usuariosService.create(dummyCreateUser);
        expect(response).not.toBe(null);

    });


    it('update user', () => {
        let dummyUpdateUser: UpdateUsuarioDto = new UpdateUsuarioDto();
        dummyUpdateUser.tokenCreater = '123';
        dummyUpdateUser.name = 'name';
        dummyUpdateUser.apellido = 'apellido';
        dummyUpdateUser.edad = 'edad';
        dummyUpdateUser.fecha_nacimiento = 'fecha_nacimiento';
        dummyUpdateUser.celular = 'celular';
        dummyUpdateUser.id_categoria = 1;
        dummyUpdateUser.email = 'a@a.com';
        dummyUpdateUser.password = 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=';
        dummyUpdateUser.token = 'tets';
        dummyUpdateUser.estado = 'A';
        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        const response = usuariosService.update(dummyUpdateUser);
        expect(response).not.toBe(null);
    });


    // async resetPassword(updatePasswordDto:UpdatePasswordDto) {
    //     let usuario: Usuario= await this.findOneById(updatePasswordDto.id);

    //     if (!usuario) {
    //       throw new HttpException('Usuario no existe', HttpStatus.BAD_REQUEST);
    //     }

    //     usuario.password = updatePasswordDto.newPassword;

    //     await this.usersRepository.update(usuario.id, usuario);

    //     return await this.utilityService.serviceResponse(HttpStatus.OK, "The password was updated");

    //   }
    it ('reset password', async () => {
        let dummyUpdatePassword: UpdatePasswordDto = new UpdatePasswordDto();
        dummyUpdatePassword.id = 1;
        dummyUpdatePassword.newPassword = '123456';
        usersRepository.find = jest.fn().mockResolvedValue(lstDummy);
        usersRepository.update = jest.fn().mockResolvedValue(dummy);
        const response = await usuariosService.resetPassword(dummyUpdatePassword);
        expect(response).not.toBe(null);
    });

});
