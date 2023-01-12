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

  async findAll() {
    let result = await this.estilosNadoRepository.find();
        
    if (!result) {
      this.genericDto.status = HttpStatus.NO_CONTENT;
      this.genericDto.payload = "No results found";
      return this.genericDto;
    }

    this.genericDto.status = HttpStatus.OK;
    this.genericDto.payload = result;
    return this.genericDto;
  }
}
