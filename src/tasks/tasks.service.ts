import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // upewnij się, że ścieżka jest poprawna

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks() {
    return this.prisma.task.findMany({
      select: { id: true, title: true, description: true, isCompleted: true, createdAt: true },
      orderBy: {
        createdAt: 'desc', // Dodatkowy bonus: nowsze zadania będą na górze
      },
    });
  }

  async createTask(data: { title: string; description?: string; authorId: number }) {
    return this.prisma.task.create({
      data,
      select: { id: true, title: true, description: true },
    });
  }

  async updateTaskStatus(id: number, isCompleted: boolean) {
    return this.prisma.task.update({
      where: { id },
      data: { isCompleted },
    });
  }

  async deleteTask(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
