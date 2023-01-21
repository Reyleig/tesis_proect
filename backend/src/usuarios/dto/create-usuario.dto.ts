import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
    @ApiProperty()
    tokenCreater: string;
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
    @ApiProperty({default: 'a@e.com',})
    email: string;
    @ApiProperty({default: 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=',})
    password: string;
    @ApiProperty()
    token: string;
    @ApiProperty({default: 'A',})
    estado: string;

    
}
