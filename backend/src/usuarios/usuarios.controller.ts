import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Usuario } from './entities/usuario.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post('/createUser')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    let response = this.usuariosService.create(createUsuarioDto);
    return response;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('/getUsuarioById/:id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch()
  update(@Body() updateUsuarioDto: UpdateUsuarioDto) {
    let response = this.usuariosService.update(updateUsuarioDto);
    return response;
  }

  @Post('/updatepassword')
  updatePassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usuariosService.updatePassword(updateUserPasswordDto);
  }

  @Post('/updateUserPassword')
  updateUserPassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usuariosService.updateUserPassword(updatePasswordDto);
  }

  //Swimmers
  @Get('/getswimmers/:token/:estado')
  async findSwimmersByIdTraining(@Param('token') token: string, @Param('estado') estado: string) {
    let token1 = await this.usuariosService.findSwimmersByIdTraining(token, estado);
    console.log(token1);

    return token1;
  }

  @Post('/createswimmer')
  createSwimmer(@Body() createSwimmerDto: CreateUsuarioDto) {
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

  @Get('/getcoachs')
  async findAllCoach() {
    let result = await this.usuariosService.findAllCoachs();
    return result;
  }

  @Get('/getcoach/:token')
  async findChoachByToken(@Param('token') token: string) {
    let result = await this.usuariosService.findCoachByToken(token);
    return result;
  }
}
