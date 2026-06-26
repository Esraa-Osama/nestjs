import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTO/createUser.dto';

@Injectable()
export class UserService {
  getUsers(): string {
    return 'users';
  }

  createUser(body: CreateUserDTO): any {
    return body;
  }
}
