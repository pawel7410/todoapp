import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { log } from 'node:console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    console.log('Health check requested');
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
