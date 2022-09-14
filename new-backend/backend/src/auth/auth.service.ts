import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';



@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);    
    
    if (user && user.password === pass) {
      const { password, ...result } = user;

      return user;
    }
    return undefined;
  }

  async login(user: CreateUsuarioDto) {
    
    let validate : Usuario = await this.validateUser(user.email,user.password);
    if(!validate) {
      return undefined;
    }
    const payload = { email: user.email, password: user.password };
    validate.token = this.jwtService.sign(payload);

    await this.usersService.updateUserToken(validate);  
    return {
      access_token: validate.token,
    };
  }
}
