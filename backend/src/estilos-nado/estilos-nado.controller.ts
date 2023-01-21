import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EstilosNadoService } from './estilos-nado.service';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('estilos-nado')
@Controller('estilos-nado')
export class EstilosNadoController {

  constructor(private readonly estilosNadoService: EstilosNadoService) { }


  @Get()
  async findAll() {
    let result = await this.estilosNadoService.findAll();
    return result;
  }

}
