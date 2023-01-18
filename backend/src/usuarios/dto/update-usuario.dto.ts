import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto{
    @ApiProperty()
    tokenCreater: string;
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    apellido: string;
    @ApiProperty()
    edad: string;
    @ApiProperty()
    fecha_nacimiento: string;
    @ApiProperty()
    celular: string;
    @ApiProperty()
    id_categoria: number;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    token: string;
    @ApiProperty()
    estado: string;
}
