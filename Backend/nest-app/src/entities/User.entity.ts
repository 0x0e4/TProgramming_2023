import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/core';
import { Message } from './Message.entity';
import { Chat } from './Chat.entity';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  phone!: string;

  @Property()
  lastOnline!: number;

  @Property({ nullable: true })
  aboutMe!: string | null;

  @Property({ nullable: true })
  avatar!: number | null;

  @OneToMany(() => Message, "owner")
  messagesSent!: Message[];

  @OneToMany(() => Chat, "owner")
  chats!: Chat[];
}