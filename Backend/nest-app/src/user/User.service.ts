import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { User } from '../entities/User.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findUserByUserId(userId: number): Promise<User> {
    const user: User = await this.userRepository.findOne({ id: userId });
    if(!user) return new User;

    user.phone = "";
    return user;
  }
}