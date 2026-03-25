import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TasksModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: '142.251.31.108', // smtp.gmail.com
        port: 465,
        secure: true,
        tls: {
          servername: 'smtp.gmail.com',
          rejectUnauthorized: false,
        },
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        connectionTimeout: 20000,
      } as any,
      defaults: {
        from: '"MyTodoApp" <noreply@mytodoapp.com>',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
