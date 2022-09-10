import { Controller, Get, Post, UseGuards, Body,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUsuarioDto } from './usuarios/dto/create-usuario.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() _:CreateUsuarioDto,@Request() req) {
    console.log("entro",_)
    return this.authService.login(_);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return "implementadisimo";
  }
}
