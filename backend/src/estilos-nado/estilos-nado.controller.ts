import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { EstilosNadoService } from './estilos-nado.service';



@Controller('estilos-nado')
export class EstilosNadoController {

  constructor(private readonly estilosNadoService: EstilosNadoService) { }


  @Get()
  async findAll() {
    let result = await this.estilosNadoService.findAll();
    return result;
  }

}
