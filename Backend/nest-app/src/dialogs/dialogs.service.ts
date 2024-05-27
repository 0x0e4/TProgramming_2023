import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager, QueryOrder, raw } from '@mikro-orm/mysql';
import { Message } from '../entities/Message.entity';
import { User } from '../entities/User.entity';
import { Dialog } from './dialogs';
import { Chat } from 'src/entities/Chat.entity';

@Injectable()
export class DialogsService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Chat)
    private readonly chatRepository: EntityRepository<Chat>,
    @InjectRepository(Message)
    private readonly messageRepository: EntityRepository<Message>,
    private readonly em: EntityManager
  ) {}

  async findDialogs(ownerid: number, limit: number = 30, offset: number = 0): Promise<Dialog[]> {
    const owner = await this.userRepository.findOne({ id: ownerid });
    if(!owner) return [];

    const qb = this.em.createQueryBuilder(Message);
    const list = await qb.where({ $or: [ {owner: owner}, {receiveid: owner.id }] }).orderBy({ time: QueryOrder.DESC }).addSelect(raw(`IF(m0.ownerid=${ownerid}, m0.receiveid, m0.ownerid) AS id`)).groupBy("id").limit(limit, offset).from(Message).getResultList();
    let result: Dialog[] = [];
    await Promise.all(list.map(async (value) => { result.push(new Dialog(value.id, value.id < 0 ? await this.chatRepository.findOne({ id: -value.id }) : await this.userRepository.findOne({ id: value.id }))) }));
    return result;
  }
}