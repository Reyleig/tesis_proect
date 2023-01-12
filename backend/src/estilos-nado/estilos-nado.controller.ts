import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { EstilosNadoService } from './estilos-nado.service';
import { GenericDto } from '../general/generic.dto';



@Controller('estilos-nado')
export class EstilosNadoController {
  genericDto: GenericDto = new GenericDto();

  constructor(private readonly estilosNadoService: EstilosNadoService) { }


  @Get()
  async findAll() {

    let result = await this.estilosNadoService.findAll();

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
