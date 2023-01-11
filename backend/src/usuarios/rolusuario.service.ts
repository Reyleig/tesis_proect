import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRolDto } from './dto/usuario-rol.dto';
import { RolUsuario } from './entities/usuario-rol.entity';

@Injectable()
export class RolUsuarioService {
  constructor(
    @InjectRepository(RolUsuario)
    private rolUsuarioRepository: Repository<RolUsuario>,
  ) {}

  async createUsuarioRol(usuarioRolDto: UsuarioRolDto) {
    return await this.rolUsuarioRepository.save(usuarioRolDto);
  }

}