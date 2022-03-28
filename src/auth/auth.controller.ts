import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { SignInDto, SignUpDto } from '../dtos/auth.dto';
import { UserMeDto } from 'src/dtos/user.dto';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('/signin')
  async signIn(@Body() credentials: SignInDto): Promise<any> {
    try {
      return await this.authservice.signIn(credentials);
    } catch (error) {
      throw error;
    }
  }
  @Post('/signup')
  async signUp(@Body() credentials: SignUpDto): Promise<any> {
    try {
      const existingUser = await this.authservice.signUp(credentials);
      return { existingUser };
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Get('/v1/me')
  async me(
    @Req() request,
    @Res({ passthrough: true }) response,
  ): Promise<UserMeDto> {
    try {
      const { account } = response.locals;
      return await this.authservice.me(account.sub);
    } catch (error) {
      if (error.name === 'TokenExpiredError')
        throw new ForbiddenException(error);
      else throw error;
    }
  }
}
