import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { TimeDeportista } from './entities/time_deportista.entity';

@Injectable()
export class TimesService {

    constructor(
        @InjectRepository(TimeDeportista)
        private timeDeportista: Repository<TimeDeportista>,
        private usuariosService: UsuariosService,
      ) {}

    async create(createTimesDeportistaDto: TimeDeportista,response) {

      if (createTimesDeportistaDto.id_deportista) {
        let usuario = await this.usuariosService.findOneById(createTimesDeportistaDto.id_deportista);
        if (usuario) {
          let save = (await this.timeDeportista.save(createTimesDeportistaDto));
          if (save) {
            response.status(HttpStatus.CREATED).Body('Time creado');
          }
        }
      }
      return  response.status(HttpStatus.INTERNAL_SERVER_ERROR).Body(`Error al crear Time`);
      }
    
}
