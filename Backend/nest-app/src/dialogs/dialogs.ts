import { User } from '../entities/User.entity';
import { Chat } from '../entities/Chat.entity';
import { EntityRepository } from '@mikro-orm/core';

export class Dialog {
    id!: number;
    name!: string;
    avatar!: number;

    constructor(dialogid: number, entity: User | Chat) {
        if(dialogid < 0) {
            this.id = dialogid;
            this.name = entity.name;
            this.avatar = entity.avatar;
        } else {
            this.id = dialogid;
            this.name = entity.name;
            this.avatar = entity.avatar;
        }
    }
}