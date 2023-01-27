import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { CreateUsuarioDto } from './usuarios/dto/create-usuario.dto';

@ApiTags('auth')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() request:CreateUsuarioDto) {
    return this.authService.login(request);
  }

}
