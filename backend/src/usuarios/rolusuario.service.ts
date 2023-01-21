import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolUsuario } from './entities/usuario-rol.entity';

@Injectable()
export class RolUsuarioService {
  constructor(
    @InjectRepository(RolUsuario)
    private rolUsuarioRepository: Repository<RolUsuario>,
  ) {}

  async createUsuarioRol(usuarioRolDto: any) {
    return await this.rolUsuarioRepository.save(usuarioRolDto);
  }

}