import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.usersService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() req: RequestWithUser) {
    return this.usersService.getUserInfo(req.user._id.toString());
  }
}
