import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { CreateSwimmerDto } from 'src/swimmers/dto/create-swimmer.dto';
import { Usuario } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

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

  @Post('/updatepassword')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usuariosService.updatePassword(updatePasswordDto);
  }

  //Swimmers

  @Get('/getswimmers/:token/:estado')
  async findSwimmersByIdTraining(@Param('token') token: string, @Param('estado') estado: string) {
    let token1 = await this.usuariosService.findSwimmersByIdTraining(token, estado);
    console.log(token1);

    return token1;
  }

  @Post('/createswimmer')
  createSwimmer(@Body() createSwimmerDto: CreateSwimmerDto) {
    return this.usuariosService.createSwimmer(createSwimmerDto);
  }

  @Post('/updateswimmer')
  updateSwimmer(@Body() updateSwimmerDto: Usuario) {

    return this.usuariosService.updateSwimmer(updateSwimmerDto);
  }

  @Get('/inactivarSwimmer/:token/:id/:estado')
  inactivateSwimmer(@Param('token') token: string, @Param('id') id: number, @Param('estado') estado: string) {
    console.log(token);
    console.log(id);
    console.log(estado);

    return this.usuariosService.inactivateSwimmer(token, id, estado);
  }

  //Coach

  @Get('/getcoach/:token')
  async findChoachByToken(@Param('token') token: string) {
    let result = await this.usuariosService.findCoachByToken(token);
    return result;
  }

}
