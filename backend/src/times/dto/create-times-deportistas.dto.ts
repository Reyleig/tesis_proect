import { ApiProperty } from '@nestjs/swagger';

export class CreateTimesDeportistaDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    id_deportista: number;
    @ApiProperty()
    id_estilos: number;
    @ApiProperty()
    fecha_registro: Date;
    @ApiProperty()
    hora_registro: string;
    @ApiProperty()
    time: string;
    @ApiProperty()
    banderas: string;
    @ApiProperty()
    time_milisecons: number;
}	