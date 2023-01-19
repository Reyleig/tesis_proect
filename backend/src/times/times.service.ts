import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { TimeDeportista } from './entities/time_deportista.entity';
import { UtilityService } from '../general/utility.service';


@Injectable()
export class TimesService {
  constructor(
    @InjectRepository(TimeDeportista)
    private timeDeportistaRepository: Repository<TimeDeportista>,
    private usuariosService: UsuariosService,
    private utilityService: UtilityService,

  ) { }

  async create(createTimesDeportistaDto: TimeDeportista) {

    if (createTimesDeportistaDto.id_deportista) {
      let usuario = await this.usuariosService.findOneById(createTimesDeportistaDto.id_deportista);
      if (usuario) {
        let save = (await this.timeDeportistaRepository.save(createTimesDeportistaDto));
        if (save) {
          return await this.utilityService.serviceResponse(HttpStatus.OK, "Time was created");
        }
      }
    }
    return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "Error al crear Time", "Comuniquese con el administrador");
  }

  async findTimesByFilters(id_deportista: number, id_estilos: number, fecha_registro: Date) {

    let result = await this.timeDeportistaRepository
      .createQueryBuilder('time_deportista')
      .select(['time_deportista.*'])
      .where('id_deportista = :id_deportista and id_estilos = :id_estilos and fecha_registro = :fecha_registro', { id_deportista, id_estilos, fecha_registro })
      .getRawMany();

    if (result.length == 0) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "Don't exist times", "Try with other filters");
    }
    return await this.utilityService.serviceResponse(HttpStatus.OK, result);
  }

  async findTimesStats() {

    let result = await this.timeDeportistaRepository
      .createQueryBuilder('time_deportista')
      .select(['round(AVG(time_deportista.time_milisecons), 0) as time_milisecons, id_deportista, u.name, time_deportista.time'])
      .innerJoin('usuarios', 'u', 'u.id = time_deportista.id_deportista')
      .groupBy('id_deportista, u.name')
      .getRawMany();

    if (result.length == 0) {
      throw new HttpException(`Sin Resultados`, HttpStatus.BAD_REQUEST);
    }
    return await this.utilityService.serviceResponse(HttpStatus.OK, result);
  }

}
