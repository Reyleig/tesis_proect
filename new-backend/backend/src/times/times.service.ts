import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { TimeDeportista } from './entities/time_deportista.entity';
import { GenericDto } from '../general/generic.dto';

@Injectable()
export class TimesService {
    genericDto = new GenericDto();

    constructor(
        @InjectRepository(TimeDeportista)
        private timeDeportista: Repository<TimeDeportista>,
        private usuariosService: UsuariosService,
      ) {}

    async create(createTimesDeportistaDto: TimeDeportista) {

      if (createTimesDeportistaDto.id_deportista) {
        let usuario = await this.usuariosService.findOneById(createTimesDeportistaDto.id_deportista);
        if (usuario) {
          let save = (await this.timeDeportista.save(createTimesDeportistaDto));
          if (save) {
            this.genericDto.status = HttpStatus.OK;
            this.genericDto.message = 'Time creado';
            return this.genericDto;
          }
        }
      }
      this.genericDto.status = HttpStatus.BAD_REQUEST;
      this.genericDto.message = 'Error al crear Time';
      this.genericDto.recomendation = 'Comuniquese con el administrador';
      return  this.genericDto;
      }
    
}
