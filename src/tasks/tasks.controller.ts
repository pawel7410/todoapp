import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  create(@Body() taskData: CreateTaskDto) {
    return this.tasksService.createTask(taskData);
  }
}
