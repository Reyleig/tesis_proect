import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Usuario } from './entities/usuario.entity';
import { CreateSwimmerDto } from 'src/swimmers/dto/create-swimmer.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor( private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  @Get('/getswimmers/:token')
  findSwimmersByIdTraining(@Param('token') token: string) {   
    console.log("/getswimmers/:token");
    return this.usuariosService.findSwimmersByIdTraining(token);
  }

  @Post('/createswimmer')
  createSwimmer(@Body() createSwimmerDto: CreateSwimmerDto) {
    return this.usuariosService.createSwimmer(createSwimmerDto);
  }

  @Get('/inactivarSwimmer/:token/:id/:estado')
  inactivateSwimmer(@Param('token') token: string,@Param('id') id: string,@Param('estado') estado: string) {  
    console.log(token);
    console.log(id);
    console.log(estado);
     
    return this.usuariosService.inactivateSwimmer(token,id);
  }

 
}
