import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // upewnij się, że ścieżka jest poprawna

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks() {
    return this.prisma.task.findMany();
  }

  async createTask(data: { title: string; description?: string; authorId: number }) {
    return this.prisma.task.create({
      data,
    });
  }
}
