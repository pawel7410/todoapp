import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'node:console';
import { Resend } from 'resend';

@Injectable()
export class AuthService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    log(email, pass, user);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    if (await bcrypt.compare(pass, user.password)) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }

  async register(email: string, pass: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    return this.prisma.user
      .create({
        data: {
          email,
          password: hashedPassword,
        },
        select: { id: true, email: true },
      })
      .then((user) => {
        this.sendWelcomeEmail(user.email);
        return user;
      });
  }

  async deleteAccount(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
      select: { id: true, email: true },
    });
  }

  private async sendWelcomeEmail(userEmail: string) {
    try {
      await this.resend.emails.send({
        from: 'MyTodoApp <noreply@pawel7410.pl>',
        to: userEmail,
        subject: 'Witaj w MyTodoApp! 🚀',
        html: `
  <div style="background-color: #f3f4f6; padding: 20px; font-family: sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Witaj w MyTodo!</h1>
      </div>
      <div style="padding: 30px;">
        <p>Cześć <b>${userEmail}</b>,</p>
        <p>Twoje konto jest już aktywne. Cieszymy się, że jesteś z nami!</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://todoapp-fe-gules.vercel.app/" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Zaloguj się do aplikacji</a>
        </div>
      </div>
    </div>
  </div>
`,
      });
      console.log('E-mail powitalny wysłany do:', userEmail);
    } catch (error) {
      console.error('Błąd wysyłki e-maila:', error);
    }
  }
}
