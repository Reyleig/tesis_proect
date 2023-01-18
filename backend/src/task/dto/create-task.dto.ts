import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty()
    token: string;
    @ApiProperty()
    tituloTarea: string;
    @ApiProperty()
    descripcionTarea: string;
}
