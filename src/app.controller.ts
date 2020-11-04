import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/Guards/local-auth.guard';
import { UsersService } from './users/users.service';
// import { UserDto } from './users/user.dto';
import { User } from './users/users.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  PartialType,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/Guards/jwt-auth.guard';

@ApiTags('User')
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService) {
  }

  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid user' })
  @ApiBody({ type: PartialType(User) })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: Partial<User>) {
    return this.authService.login(user);
  }

  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: PartialType(User) })
  @Post('register')
  async register(@Body() user: Partial<User>) {
    await this.userService.register(user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile() {
    return 'profile';
  }

  @ApiOkResponse({ description: 'User Login' })
  @Get('news')
  async news() {
    return 'news';
  }
}
