import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilityService } from '../general/utility.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private usuariosService: UsuariosService,
    private utilityService: UtilityService,
  ) { }

  async createTask(createTaskDto: CreateTaskDto) {

    let user = await this.usuariosService.findOneByToken(createTaskDto.token);

    if (!user) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, 'User not found', 'Try again, something went wrong');
    }

    let taskEntity: Task = new Task(user.id, createTaskDto.tituloTarea, createTaskDto.descripcionTarea);
    let save = (await this.taskRepository.save(taskEntity));

    if (!save) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "Error creating task", "Try again, something went wrong");
    }

    return await this.utilityService.serviceResponse(HttpStatus.OK, "Task was created");
  }

  async findAll() {
    let result = await this.taskRepository.find();
    return await this.utilityService.serviceResponse(HttpStatus.OK, result);
  }

  async findById(id: number) {
    let result = await this.taskRepository.find({
      select: ['id', 'id_usuario', 'titulo_tarea', 'descripcion_tarea', 'fecha_registro'],
      where: {
        id: id,
      },
    });
    return result[0];
  }

  async findByIdUsuario(token: string) {

    let user = await this.usuariosService.findOneByToken(token);

    if (!user) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, 'User not found');
    }

    const resp = await this.taskRepository.find({
      select: ['id', 'id_usuario', 'titulo_tarea', 'descripcion_tarea', 'fecha_registro'],
      where: {
        id_usuario: user.id,
      },
    });

    return await this.utilityService.serviceResponse(HttpStatus.OK, resp);
  }

  async updateTask(updateTaskDto: UpdateTaskDto) {

    let user = await this.usuariosService.findOneByToken(updateTaskDto.token);

    if (!user) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, 'User not found', 'Try again, something went wrong');
    }

    let task: Task = await this.findById(updateTaskDto.id);
    if (user.id != task.id_usuario) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "You can't update this task", "Try again, something went wrong");
    }

    task.titulo_tarea = updateTaskDto.tituloTarea;
    task.descripcion_tarea = updateTaskDto.descripcionTarea;

    let result = await this.taskRepository.update(task.id, task);

    if (result.affected == 0) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The task was not updated", "Try again, something went wrong");
    }
    return await this.utilityService.serviceResponse(HttpStatus.OK, "The task was updated");
  }


  async remove(token: string, id: number) {

    let user = await this.usuariosService.findOneByToken(token);

    if (!user) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, 'User not found', 'Try again, something went wrong');
    }

    let task: Task = await this.findById(id);
    if (user.id != task.id_usuario) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "You can't delete this task", "Try again, something went wrong");
    }

    let result = await this.taskRepository.delete(task);

    if (result.affected == 0) {
      return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The task was not deleted", "Try again, something went wrong");
    }
    return await this.utilityService.serviceResponse(HttpStatus.OK, "The task was deleted");
  }

}
