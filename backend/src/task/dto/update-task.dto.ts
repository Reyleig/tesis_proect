import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiProperty()
    token: string;
    @ApiProperty()
    id: number;
    @ApiProperty()
    tituloTarea: string;
    @ApiProperty()
    descripcionTarea: string;
}
