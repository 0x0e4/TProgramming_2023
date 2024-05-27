import { Controller, Get, Post, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './User.service';
import { User } from '../entities/User.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  public async getUserByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.findUserByUserId(userId);
  }
}