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
        private timeDeportistaRepository: Repository<TimeDeportista>,
        private usuariosService: UsuariosService,
      ) {}

    async create(createTimesDeportistaDto: TimeDeportista) {

      if (createTimesDeportistaDto.id_deportista) {
        let usuario = await this.usuariosService.findOneById(createTimesDeportistaDto.id_deportista);
        if (usuario) {
          let save = (await this.timeDeportistaRepository.save(createTimesDeportistaDto));
          if (save) {
            this.genericDto.status = HttpStatus.OK;
            this.genericDto.payload = 'Time creado';
            return this.genericDto;
          }
        }
      }
      this.genericDto.status = HttpStatus.BAD_REQUEST;
      this.genericDto.recomendation = 'Comuniquese con el administrador';
      this.genericDto.payload = 'Error al crear Time';
      return  this.genericDto;
      }

      async findTimesByFilters(id_deportista: number, id_estilos: number, fecha_registro: string) {


        return await this.timeDeportistaRepository
          .createQueryBuilder('time_deportista')
          .select(['time_deportista.*'])
          .where('id_deportista = :id_deportista and  id_estilos = :id_estilos', { id_deportista, id_estilos })
          //.innerJoin('entrenador_deportista', 'ed', 'usuarios.id = ed.iddeportista')
          .getRawMany();
      }
    
}
