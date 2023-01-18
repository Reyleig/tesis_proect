import { ApiProperty } from '@nestjs/swagger';

export class UsuarioRolDto {
    @ApiProperty({default: 3, enum: [{admin:1}, {coach:2}, {swimmer:3}]})
    idrol: number;
    @ApiProperty()
    idusuario: number;
}
