import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';


@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private usersRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  findAll(): Promise<Usuario[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string):  Promise<Usuario | undefined> {    
    const resp = await this.usersRepository.find({
      select: ['id','email','password','token'],
      where: {
       email: email,
      },
    });

    return resp[0];
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async updateUserToken(user: Usuario):  Promise<Usuario | undefined> {    
    const resp = await this.usersRepository.update(user.id,user);
console.log(resp);

    return resp[0];
  }
}
