import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';



@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);    
    
    if (user && user.password === pass) {
      return user;
    }
    return undefined;
  }

  async login(user: CreateUsuarioDto) {
    
    let validate : Usuario = await this.validateUser(user.email,user.password);
    if(!validate) {
      throw new HttpException(`Usuario no autorizado`, HttpStatus.UNAUTHORIZED);
    }
        
    if (validate.estado !== 'A'){
      throw new HttpException(`Usuario Inactivo`, HttpStatus.UNAUTHORIZED);
    }

    if (validate.idrol === 3){
      throw new HttpException(`Usuario no autorizado`, HttpStatus.UNAUTHORIZED);
    }
    const payload = { email: user.email, password: user.password };
    validate.token = this.jwtService.sign(payload);

    await this.usersService.updateUserToken(validate);  
    
    return {
      access_token: validate.token,
      username:validate.name,
      idrol:validate.idrol
    };
  }
}
