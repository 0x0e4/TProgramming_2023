import { Entity, PrimaryKey, Property, ManyToOne, OneToMany } from '@mikro-orm/core';
import { User } from './User.entity';
import { Media } from './Media.entity';
import { SentMedia } from './SentMedia.entity';

@Entity()
export class Message {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: 'User', joinColumn: 'id', fieldName: 'ownerid' })
  owner!: User;

  @Property({ nullable: true })
  receiveid!: number | null;

  @Property()
  time!: number;

  @Property()
  text!: string;

  @OneToMany(() => SentMedia, "messages")
  sentMedia!: SentMedia[];
}