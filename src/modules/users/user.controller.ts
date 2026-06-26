import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/createUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): string {
    return this.userService.getUsers();
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  createUser(@Body() body: CreateUserDTO): any {
    if (body.age < 24) {
      throw new BadRequestException('age must be greater than or equals 24');
    }
    return body;
  }
}
