import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // upewnij się, że ścieżka jest poprawna

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(userId: number) {
    return this.prisma.task.findMany({
      where: { authorId: userId },
      select: { id: true, title: true, description: true, isCompleted: true, createdAt: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createTask(userId: number, data: { title: string; description?: string }) {
    return this.prisma.task.create({
      data: {
        ...data,
        author: {
          connect: { id: userId },
        },
      },
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
