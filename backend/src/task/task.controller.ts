import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async findAll() {
    let result = this.taskService.findAll();
    return result;
  }

  @Get('/:token')
  async findUserTasks(@Param('token') token: string) {
    let result = this.taskService.findByIdUsuario(token);
    return result;
  }

  @Post('/createTask')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch()
  updateTask(@Body() updateTaskDto: UpdateTaskDto) {
    let result = this.taskService.updateTask(updateTaskDto);
    return result;
  }

  @Delete('/:token/:id')
  remove(@Param('token') token: string, @Param('id') id: number) {
    return this.taskService.remove(token, id);
  }
}
