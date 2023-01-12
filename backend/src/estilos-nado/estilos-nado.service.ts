import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstilosNado } from './entities/estilos-nado.entity';
import { UtilityService } from '../general/utility.service';

@Injectable()
export class EstilosNadoService {

  constructor(
    @InjectRepository(EstilosNado)
    private estilosNadoRepository: Repository<EstilosNado>,
    private utilityService: UtilityService,
  ) { }

  async findAll() {
    let result = await this.estilosNadoRepository.find();

    if (!result) {
      return await this.utilityService.serviceResponse(HttpStatus.NO_CONTENT, result, "No results found");
    }
    return await this.utilityService.serviceResponse(HttpStatus.OK, result);
  }
}
