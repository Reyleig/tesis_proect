import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log("user",user);
    console.log("user2",pass);
    
    
    if (user && user.password === pass) {
      console.log("aaaaaaaaa")
      const { password, ...result } = user;
      return result;
    }
    return undefined;
  }

  async login(user: any) {
    
    let validate= await this.validateUser(user.email,user.password);
    console.log(validate)
    if(!validate) {
      return undefined;
    }
    const payload = { email: user.email, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
