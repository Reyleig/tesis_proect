import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { EntrenadorDeportistaDto } from 'src/usuarios/dto/entrenador-deportista.dto';
import { UpdateUserPasswordDto } from 'src/usuarios/dto/update-user-password.dto';
import { EntrenadorDeportista } from './entities/entrenador_deportista.entity';
import { EntrenadorDeportistaService } from './entrenadordeportista.service';
import { UsuarioRolDto } from './dto/usuario-rol.dto';
import { RolUsuarioService } from './rolusuario.service';
import { UtilityService } from '../general/utility.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usersRepository: Repository<Usuario>,
    private entrenadorDeportistaService: EntrenadorDeportistaService,
    private rolUsuarioService: RolUsuarioService,
    private utilityService: UtilityService,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {

    let user: Usuario = await this.findOneByToken(createUsuarioDto.tokenCreater);
    if (!user) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The user don't exist", "Try again with another user");
    }

    let newUser = await this.buildUserEntity(createUsuarioDto);
    if (!newUser) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The user was not created", "Try again with another user");
    }

    switch (user.idrol) {
      case 1:
        newUser.idrol = 2;
        break;

      case 2:
        newUser.idrol = 3;
        break;

      default:
        return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The user don't have permission to create a new user", "Try again with another user");
    }

    let response = await this.usersRepository.save(newUser);
    if (!response) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The user was not created", "Try again with another user");
    }
    return await this.utilityService.serviceResponse(HttpStatus.OK, "The user was created successfully");
  }


  async update(updateUsuarioDto: UpdateUsuarioDto) {

    let user: Usuario = await this.findOneByToken(updateUsuarioDto.tokenCreater);
    if (!user) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The user don't exist", "Try again with another user");
    }

    let userUpdated: Usuario = await this.findOneById(updateUsuarioDto.id);
    if (!userUpdated) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The user don't exist", "Try again with another user");
    }

    userUpdated.name = updateUsuarioDto.name;
    userUpdated.apellido = updateUsuarioDto.apellido;
    userUpdated.edad = updateUsuarioDto.edad;
    userUpdated.fecha_nacimiento = updateUsuarioDto.fecha_nacimiento;
    userUpdated.celular = updateUsuarioDto.celular;
    userUpdated.id_categoria = updateUsuarioDto.id_categoria;
    userUpdated.email = updateUsuarioDto.email;
    userUpdated.estado = updateUsuarioDto.estado;

    let result = await this.usersRepository.update(userUpdated.id, userUpdated);

    if (result.affected == 0) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The user was not updated", "Try again, something went wrong");
    }
    return await this.utilityService.serviceResponse(HttpStatus.OK, "The user was updated");
  }

  async findAll() {
    let resp = this.usersRepository.find();
    if (!resp) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "There are not users");
    }
    return this.utilityService.serviceResponse(HttpStatus.OK, resp);
  }


  async findOne(email: string): Promise<Usuario | undefined> {
    const resp = await this.usersRepository.find({
      select: ['id', 'name', 'email', 'password', 'idrol', 'token'],
      where: {
        email: email,
      },
    });

    return resp[0];
  }
  async findOneByToken(token: string): Promise<Usuario | undefined> {
    const resp = await this.usersRepository.find({
      select: ['id', 'name', 'email', 'password', 'idrol', 'token', 'estado'],
      where: {
        token: token,
      },
    });

    return resp[0];
  }

  async findAllCoachs() {
    let resp = await this.usersRepository.find({
      select: ['name', 'apellido', 'edad', 'fecha_nacimiento', 'celular', 'email', 'idrol'],
      where: {
        idrol: 2,
      },
    });

    if (resp.length == 0) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "There are not coachs");
    }
    return this.utilityService.serviceResponse(HttpStatus.OK, resp);
  }

  async findCoachByToken(token: string) {
    const resp = await this.usersRepository.find({
      select: ['name', 'apellido', 'edad', 'fecha_nacimiento', 'celular', 'email', 'idrol'],
      where: {
        token: token,
      },
    });
    return await this.utilityService.serviceResponse(HttpStatus.OK, resp[0]);
  }

  async findOneById(idusuario: number): Promise<Usuario | undefined> {
    const resp = await this.usersRepository.find({
      select: ['id', 'name', 'email', 'password', 'idrol', 'token', 'estado', 'apellido', 'celular', 'id_categoria', 'edad', 'fecha_nacimiento',],
      where: {
        id: idusuario,
      },
    });


    return resp[0];
  }

  async findSwimmersByIdTraining(token: string, estado: string): Promise<any> {


    let { id }: Usuario = await this.findOneByToken(token);

    return await this.usersRepository
      .createQueryBuilder('usuarios')
      .select([`usuarios.*,coalesce(td.time,'00:00:00') as time, coalesce(max(td.time_milisecons),0) as time_milisecons, coalesce(en.descripcion,'') as estilo, coalesce(fecha_registro,'') as fecha_registro `])
      .where('ed.identrenador = :id and  usuarios.estado = :estado', { id, estado: estado })
      .innerJoin('entrenador_deportista', 'ed', 'usuarios.id = ed.iddeportista')
      .leftJoin('time_deportista', 'td', 'usuarios.id = td.id_deportista')
      .leftJoin('estilos_nado', 'en', 'td.id_estilos = en.id')
      .groupBy('usuarios.id,idrol,name,apellido,celular,email,password,edad,fecha_nacimiento,estado,token,id_categoria')
      .getRawMany();
  }

  async inactivateSwimmer(token: string, idSwimmer: number, estado: string): Promise<any> {
    estado = estado == 'true' ? 'I' : 'A';
    let usuario: Usuario = await this.findOneById(idSwimmer);
    usuario.estado = estado;
    await this.updateUserToken(usuario);

    return usuario;
  }


  async updateUserToken(user: Usuario): Promise<Usuario | undefined> {
    const resp = await this.usersRepository.update(user.id, user);
    return resp[0];
  }

  async createSwimmer(createSwimmerDto: CreateUsuarioDto) {
    //guardar usuario
    let swimmer = await this.usersRepository.save(createSwimmerDto);
    let entrenadorDeportista: EntrenadorDeportistaDto = new EntrenadorDeportistaDto();

    entrenadorDeportista.iddeportista = swimmer.id;
    let entrenador: Usuario = await this.findOneByToken(createSwimmerDto.token);
    createSwimmerDto.token
    entrenadorDeportista.identrenador = entrenador.id;
    await this.entrenadorDeportistaService.createEntrenadorDeportista(entrenadorDeportista);
    //guardar usuario-rol
    let usuarioRol: UsuarioRolDto = new UsuarioRolDto();
    usuarioRol.idusuario = swimmer.id;
    usuarioRol.idrol = 3;
    await this.rolUsuarioService.createUsuarioRol(usuarioRol);


    return 'This action adds a new usuario';
  }


  async updateSwimmer(updateSwimmerDto: any) {
    // actualizar usuario
    let swimmer = await this.usersRepository.update(updateSwimmerDto.id, updateSwimmerDto);

    return null;
  }

  async updatePassword(updateUserPasswordDto: UpdateUserPasswordDto) {

    let user: Usuario = await this.findOneByToken(updateUserPasswordDto.token);
    if (!user) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The user don't exist", "Try again with another user");
    }

    if (user.password != updateUserPasswordDto.actualPassword) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The old password is incorrect", "Try again with the correct password");
    }

    if (user.email == updateUserPasswordDto.actualPassword) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The old password is not valid", "Try again with the another password");
    }

    user.password = updateUserPasswordDto.newPassword;
    let result = await this.usersRepository.update(user.id, user);
    if (result.affected == 0) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The password was not updated", "Try again, something went wrong");
    }
    return await this.utilityService.serviceResponse(HttpStatus.OK, "The password was updated");
  }



  async updateUserPassword(updatePasswordDto: UpdatePasswordDto) {
    return null;
  }

  async buildUserEntity(createUsuarioDto: CreateUsuarioDto) {
    let newUser = new Usuario(
      createUsuarioDto.name,
      createUsuarioDto.apellido,
      createUsuarioDto.edad,
      createUsuarioDto.fecha_nacimiento,
      createUsuarioDto.celular,
      createUsuarioDto.id_categoria,
      createUsuarioDto.email,
      createUsuarioDto.password,
      createUsuarioDto.token,
      createUsuarioDto.estado);
    return newUser;
  }

}