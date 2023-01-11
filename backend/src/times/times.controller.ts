import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { CreateTimesDeportistaDto } from './dto/create-times-deportistas.dto';
import { GenericDto } from '../general/generic.dto';
import { TimesService } from './times.service';

@Controller('times')
export class TimesController {
  genericDto: GenericDto = new GenericDto();
  constructor(private readonly timesService: TimesService) { }


  @Post("/create")
  create(@Body() createSwimmerDto: CreateTimesDeportistaDto) {
    return this.timesService.create(createSwimmerDto);
  }

  @Get("/getTimesByFilters/:id_deportista/:id_estilos/:fecha_registro")
  async findTimesByFilters(@Param('id_deportista') id_deportista: number, @Param('id_estilos') id_estilos: number, @Param('fecha_registro') fecha_registro: string) {
    let result = await this.timesService.findTimesByFilters(id_deportista, id_estilos, fecha_registro);
    console.log(result);
    this.genericDto.status = HttpStatus.OK;
    this.genericDto.payload = result;

    return this.genericDto;
  }

}