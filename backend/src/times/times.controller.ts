import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTimesDeportistaDto } from './dto/create-times-deportistas.dto';
import { TimesService } from './times.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('times')
export class TimesController {
  constructor(private readonly timesService: TimesService) { }


  @Post("/create")
  create(@Body() createSwimmerDto: CreateTimesDeportistaDto) {
    return this.timesService.create(createSwimmerDto);
  }

  @Get("/getTimes/:id_deportista/:id_estilos/:fecha_registro")
  async findTimesByFilters(@Param('id_deportista') id_deportista: number, @Param('id_estilos') id_estilos: number, @Param('fecha_registro') fecha_registro: Date) {
    console.log(fecha_registro);
    let result = await this.timesService.findTimesByFilters(id_deportista, id_estilos, fecha_registro);
    return result;
  }

}