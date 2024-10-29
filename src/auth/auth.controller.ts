import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signupData: CreateAuthDto): Promise<string> {
    return await this.authService.signUp(signupData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginData: LoginDTO) {
    return await this.authService.login(loginData);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshtoken: string) {
    return await this.authService.refreshToken(refreshtoken)
  }


}
