import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateSwimmerDto } from 'src/swimmers/dto/create-swimmer.dto';
import { EntrenadorDeportistaDto } from 'src/usuarios/dto/entrenador-deportista.dto';
import { EntrenadorDeportista } from './entities/entrenador_deportista.entity';
import { EntrenadorDeportistaService } from './entrenadordeportista.service';
import { UsuarioRolDto } from './dto/usuario-rol.dto';
import { RolUsuarioService } from './rolusuario.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usersRepository: Repository<Usuario>,
    private entrenadorDeportistaService: EntrenadorDeportistaService,
    private rolUsuarioService: RolUsuarioService,
  ) { }

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  findAll(): Promise<Usuario[]> {
    return this.usersRepository.find();
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

  async findCoachByToken(token: string): Promise<Usuario | undefined> {
    const resp = await this.usersRepository.find({
      select: ['name', 'apellido', 'edad', 'date', 'celular', 'email', 'idrol'],
      where: {
        token: token,
      },
    });

    return resp[0];
  }

  async findOneById(idusuario: number): Promise<Usuario | undefined> {
    const resp = await this.usersRepository.find({
      select: ['id', 'name', 'email', 'password', 'idrol', 'token', 'estado','apellido','celular','categoria','edad','date',],
      where: {
        id: idusuario,
      },
    });
    

    return resp[0];
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  // findSwimmersByIdTraining(id: number) {
  //   const resp = await this.usersRepository.find({
  //     select: ['id', 'name', 'email', 'password', 'idrol', 'token'],
  //     where: {
  //       email: email,
  //     },
  //   });
  // }

  async findSwimmersByIdTraining(token: string, estado: string): Promise<any> {


    let { id }: Usuario = await this.findOneByToken(token);

    return await this.usersRepository
      .createQueryBuilder('usuarios')
      .select(['usuarios.*'])
      .where('ed.identrenador = :id and  usuarios.estado = :estado', { id, estado: estado })
      .innerJoin('entrenador_deportista', 'ed', 'usuarios.id = ed.iddeportista')
      .getRawMany();
  }

  async inactivateSwimmer(token: string, idSwimmer: number, estado: string): Promise<any> {
    estado = estado == 'true' ? 'I' : 'A';
    let usuario: Usuario = await this.findOneById(idSwimmer);
    usuario.estado = estado;
    await this.updateUserToken(usuario);

    return usuario;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async updateUserToken(user: Usuario): Promise<Usuario | undefined> {
    console.log('user',user);
    
    const resp = await this.usersRepository.update(user.id, user);

    console.log('resp',resp);
    
    return resp[0];
  }

  async createSwimmer(createSwimmerDto: CreateSwimmerDto) {
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

  async updatePassword(UpdatePasswordDto: any) {

    let user: Usuario = await this.findOneByToken(UpdatePasswordDto.token);
    if (!user) {
      return "The user don't exist";
    }
    user.password = UpdatePasswordDto.password;
    let result = await this.usersRepository.update(user.password, user);

    console.log(result);
     return result;
  }

}



