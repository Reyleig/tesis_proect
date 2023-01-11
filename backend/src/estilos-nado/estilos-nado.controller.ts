import { Controller } from '@nestjs/common';
import { EstilosNadoService } from './estilos-nado.service';

@Controller('estilos-nado')
export class EstilosNadoController {
  constructor(private readonly estilosNadoService: EstilosNadoService) {}
}
