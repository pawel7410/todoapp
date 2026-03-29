import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.email, signInDto.pass);
  }

  @Post('register')
  register(@Body() registerDto: Record<string, any>) {
    return this.authService.register(registerDto.email, registerDto.password);
  }

  @Delete('account')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  deleteAccount(@Request() req: { user: { sub: number } }) {
    return this.authService.deleteAccount(req.user.sub);
  }
}
