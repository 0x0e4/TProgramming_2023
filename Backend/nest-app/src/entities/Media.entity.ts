import { Entity, PrimaryKey, Property, ManyToOne, OneToMany } from '@mikro-orm/core';
import { User } from './User.entity';
import { Message } from './Message.entity';
import { SentMedia } from './SentMedia.entity';

@Entity()
export class Media {
  @PrimaryKey()
  id!: number;

  @Property()
  type!: number;

  @Property()
  url!: string;

  @ManyToOne({ fieldName: 'ownerid', joinColumn: 'id', entity: 'User' })
  mediaOwner!: User;

  @OneToMany(() => SentMedia, "media")
  sentMedia!: SentMedia[];
}