import { HttpStatus, Injectable } from '@nestjs/common';
import { GenericDto } from '../general/generic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstilosNado } from './entities/estilos-nado.entity';

@Injectable()
export class EstilosNadoService {
    genericDto: GenericDto = new GenericDto();

    constructor(
        @InjectRepository(EstilosNado)
        private estilosNadoRepository: Repository<EstilosNado>,
      ) { }

      async findAll(): Promise<EstilosNado[]> {
        return this.estilosNadoRepository.find();
      }

}
