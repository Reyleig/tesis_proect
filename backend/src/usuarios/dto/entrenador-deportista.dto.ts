import { ApiProperty } from '@nestjs/swagger';

export class EntrenadorDeportistaDto {
    @ApiProperty()
     identrenador: number;
    @ApiProperty()
     iddeportista: number;
 }
 