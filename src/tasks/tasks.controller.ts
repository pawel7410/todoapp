import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  create(@Body() taskData: { title: string; description?: string; authorId: number }) {
    return this.tasksService.createTask(taskData);
  }
}
