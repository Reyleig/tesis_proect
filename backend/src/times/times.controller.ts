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

  @Get("/getTimes/:id_deportista/:id_estilos/:fecha_registro")
  async findTimesByFilters(@Param('id_deportista') id_deportista: number, @Param('id_estilos') id_estilos: number, @Param('fecha_registro') fecha_registro: Date) {
    console.log(fecha_registro);
    let result = await this.timesService.findTimesByFilters(id_deportista, id_estilos, fecha_registro);
    
    if (result.length == 0) {
      this.genericDto.status = HttpStatus.BAD_REQUEST;
      this.genericDto.payload = "Don't exist times";
      return this.genericDto;
    }
    this.genericDto.status = HttpStatus.OK;
    this.genericDto.payload = result;
    return this.genericDto;
  }

}