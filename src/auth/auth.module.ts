import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, PrismaService],
  imports: [
    JwtModule.register({
      secret: 'your_jwt_secret_key', // // W produkcji trzymaj to w .env!
      global: true, // Umożliwia używanie JwtService w cał ej aplikacji
      signOptions: { expiresIn: '1h' }, // Token wygasa po 1 godzinie
    }),
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
