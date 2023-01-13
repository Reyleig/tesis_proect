import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    token: string;
    id: number;
    tituloTarea: string;
    descripcionTarea: string;
}
