import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager, QueryOrder } from '@mikro-orm/core';
import { Message } from '../entities/Message.entity';
import { User } from '../entities/User.entity';

@Injectable()
export class MessagesService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Message)
    private readonly messageRepository: EntityRepository<Message>,
    private readonly em: EntityManager
  ) {}

  async findMessages(ownerid: number, receiveid: number, offset: number = 0, limit: number = 30): Promise<Message[]> {
    if(receiveid < 0)
      return this.messageRepository.find({ receiveid: receiveid }, { limit: limit, offset: offset, orderBy: { time: QueryOrder.DESC } });
    else
      return this.messageRepository.find({ $or: [{ owner: await this.userRepository.findOne(receiveid), receiveid: ownerid }, { owner: await this.userRepository.findOne(ownerid), receiveid: receiveid }]}, { limit: limit, offset: offset, orderBy: { time: QueryOrder.DESC } });
  }

  async createMessage(data: Message): Promise<Message> {
    const newMessage = this.messageRepository.create(data);
    newMessage.id = await this.messageRepository.insert(newMessage);
    return newMessage;
  }
}