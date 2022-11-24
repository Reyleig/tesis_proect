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

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usersRepository: Repository<Usuario>,
    private entrenadorDeportistaService: EntrenadorDeportistaService,
  ) {}

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
      select: ['id', 'name', 'email', 'password', 'idrol', 'token'],
      where: {
        token: token,
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

  async findSwimmersByIdTraining(token: string): Promise<any> {

    let {id}: Usuario = await this.findOneByToken(token);
    return await this.usersRepository
    .createQueryBuilder('usuarios')
    .select(['usuarios.*'])
    .where('ed.identrenador = :id and  usuarios.estado = :estado', {id, estado: 'A'})
    .innerJoin('entrenador_deportista', 'ed','usuarios.id = ed.iddeportista')
    .getRawMany();
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async updateUserToken(user: Usuario): Promise<Usuario | undefined> {
    const resp = await this.usersRepository.update(user.id, user);
    console.log(resp);

    return resp[0];
  }

  async createSwimmer(createSwimmerDto: CreateSwimmerDto) {
    //guardar usuario
    let swimmer=await this.usersRepository.save(createSwimmerDto);
    let entrenadorDeportista: EntrenadorDeportistaDto = new EntrenadorDeportistaDto();
    console.log(entrenadorDeportista);
    
    entrenadorDeportista.iddeportista = swimmer.id;
    let entrenador: Usuario = await this.findOneByToken(createSwimmerDto.token);
    createSwimmerDto.token
    entrenadorDeportista.identrenador = entrenador.id;
    await this.entrenadorDeportistaService.createEntrenadorDeportista(entrenadorDeportista);
    //guardar entrenador_deportista
    

    return 'This action adds a new usuario';
  }

}



