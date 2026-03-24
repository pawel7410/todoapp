import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Headers } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(@Headers('user-agent') agent: string) {
    console.log(`[${new Date().toISOString()}] Ping from: ${agent}`);
    return { status: 'ok' };
  }
}
