import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { UtilityService } from '../general/utility.service';
import { EntrenadorDeportista } from '../usuarios/entities/entrenador_deportista.entity';
import { RolUsuario } from '../usuarios/entities/usuario-rol.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { EntrenadorDeportistaService } from '../usuarios/entrenadordeportista.service';
import { RolUsuarioService } from '../usuarios/rolusuario.service';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TaskService', () => {
    let service: TaskService;
    let usuariosService: UsuariosService;
    let taskRepository: Repository<Task>;
    let usuarioRepository: Repository<Usuario>;
    
    let dummyUser: Usuario = new Usuario(
        '1',
        'eseban',
        'lopez',
        '25',
        '1994-01-01',
        1,
        'a@a.com',
        'tets',
        'test',
        'A',
    );
    let dummyTask : Task = {
        id: 1,
        id_usuario: 1,
        titulo_tarea: 'titulo',
        descripcion_tarea: 'descripcion',
        fecha_registro: new Date(),
    };
    const mockTaskRepositoryFactory = jest.fn(() => ({
        find: jest.fn(entity => entity).mockResolvedValue({}),
        save: jest.fn(entity => entity).mockResolvedValue({}),
    }));
    const mockUserRepositoryFactory = jest.fn(() => ({
        findOneBy: jest.fn(entity => entity),
        find: jest.fn(entity => entity).mockResolvedValue({}),
        findOneByToken: jest.fn(entity => entity),
        getRawMany: jest.fn(entity => entity),
        update: jest.fn(entity => entity).mockResolvedValue({}),
        createQueryBuilder: jest.fn(() => ({
            select: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            innerJoin: jest.fn().mockReturnThis(),
            leftJoin: jest.fn().mockReturnThis(),
            groupBy: jest.fn().mockReturnThis(),
            getRawMany: jest.fn().mockResolvedValue({}),
        })),
    }));

    const mockEntrenadorDeportistaRepositoryFactory = jest.fn(() => ({
        find: jest.fn(entity => entity).mockResolvedValue({}),
        save: jest.fn(entity => entity).mockResolvedValue({}),
    }));
    const mockRolUsuarioRepositoryFactory = jest.fn(() => ({
        find: jest.fn(entity => entity).mockResolvedValue({}),
        save: jest.fn(entity => entity).mockResolvedValue({}),
    }));

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TaskController],
            providers: [
                TaskService,
                UtilityService,
                UsuariosService,
                EntrenadorDeportistaService,
                RolUsuarioService,
                {
                    provide: getRepositoryToken(Task),
                    useFactory: mockTaskRepositoryFactory,
                },
                {
                    provide: getRepositoryToken(Usuario),
                    useFactory: mockUserRepositoryFactory,
                }
                ,
                {
                    provide: getRepositoryToken(EntrenadorDeportista),
                    useValue: mockEntrenadorDeportistaRepositoryFactory,
                },
                {
                    provide: getRepositoryToken(RolUsuario),
                    useValue: mockRolUsuarioRepositoryFactory,
                },
            ],
        }).compile();

        service = module.get<TaskService>(TaskService);
        usuariosService = module.get<UsuariosService>(UsuariosService);
        taskRepository = module.get<Repository<Task>>(getRepositoryToken(Usuario));
        usuarioRepository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));

    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should update-create a task', async () => {
        usuarioRepository.find = jest.fn().mockResolvedValue(dummyUser);
        usuariosService.findOneByToken = jest.fn().mockResolvedValue({ id: 1 });

        taskRepository.save = jest.fn().mockResolvedValue(dummyTask);
        let updateTaskDto: UpdateTaskDto = {
            token: 'token',
            id: 1,
            tituloTarea: 'titulo',
            descripcionTarea: 'descripcion',
        };
        let result = await service.updateTask(updateTaskDto);
        expect(result).not.toBe(null);
    });

    // async remove(token: string, id: number) {

    //     let user = await this.usuariosService.findOneByToken(token);
    
    //     if (!user) {
    //       return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, 'User not found', 'Try again, something went wrong');
    //     }
    
    //     let task: Task = await this.findById(id);
    //     if (user.id != task.id_usuario) {
    //       return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "You can't delete this task", "Try again, something went wrong");
    //     }
    
    //     let result = await this.taskRepository.delete(task);
    
    //     if (result.affected == 0) {
    //       return await this.utilityService.serviceResponse(HttpStatus.BAD_REQUEST, "The task was not deleted", "Try again, something went wrong");
    //     }
    //     return await this.utilityService.serviceResponse(HttpStatus.OK, "The task was deleted");
    //   }

    it('should delete a task', async () => {
        usuarioRepository.find = jest.fn().mockResolvedValue(dummyUser);
        jest.spyOn(usuariosService, 'findOneByToken').mockImplementation(() => Promise.resolve(dummyUser));
        jest.spyOn(service, 'findById').mockImplementation(() => Promise.resolve(dummyTask));
        taskRepository.delete = jest.fn().mockResolvedValue({ affected: 1 });
        let result = await service.remove('1', 1);
        expect(result).not.toBe(null);
    });

    // async findById(id: number) {
    //     let result = await this.taskRepository.find({
    //       select: ['id', 'id_usuario', 'titulo_tarea', 'descripcion_tarea', 'fecha_registro'],
    //       where: {
    //         id: id,
    //       },
    //     });
    //     return result[0];
    //   }

    it('should find a task by id', async () => {
        taskRepository.find = jest.fn().mockResolvedValue([dummyTask]);
        let result = await service.findById(1);
        expect(result).not.toBe(null);
    });


});





