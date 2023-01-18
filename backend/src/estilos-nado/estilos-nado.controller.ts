import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EstilosNadoService } from './estilos-nado.service';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('estilos-nado')
export class EstilosNadoController {

  constructor(private readonly estilosNadoService: EstilosNadoService) { }


  @Get()
  async findAll() {
    let result = await this.estilosNadoService.findAll();
    return result;
  }

}
