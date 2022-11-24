import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntrenadorDeportista } from './entities/entrenador_deportista.entity';

@Injectable()
export class EntrenadorDeportistaService {
  constructor(
    @InjectRepository(EntrenadorDeportista)
    private entrenadorDeportistaRepository: Repository<EntrenadorDeportista>,
  ) {}

  async createEntrenadorDeportista(entrenadorDeportista: EntrenadorDeportista) {
    return await this.entrenadorDeportistaRepository.save(entrenadorDeportista);
  }

}



