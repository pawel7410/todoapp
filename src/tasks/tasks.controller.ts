import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Request() req) {
    const userId = req.user.sub;
    return this.tasksService.getAllTasks(userId);
  }

  @Post()
  create(@Request() req, @Body() taskData: Omit<CreateTaskDto, 'authorId'>) {
    const userId = req.user.sub;
    return this.tasksService.createTask(userId, taskData);
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body('isCompleted') isCompleted: boolean) {
    return this.tasksService.updateTaskStatus(id, isCompleted);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Patch('reorder')
  async reorderTasks(@Body() taskIds: number[]) {
    return this.tasksService.reorder(taskIds);
  }
}
