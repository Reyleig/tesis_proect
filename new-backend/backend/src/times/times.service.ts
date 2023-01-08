import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeDeportista } from './entities/time_deportista.entity';

@Injectable()
export class TimesService {

    constructor(
        @InjectRepository(TimeDeportista)
        private timeDeportista: Repository<TimeDeportista>,
      ) {}

    async create(createTimesDeportistaDto: TimeDeportista) {
        console.log("entro", createTimesDeportistaDto);
        
        console.log(await this.timeDeportista.save(createTimesDeportistaDto));
        
        return null;
      }
    
}
