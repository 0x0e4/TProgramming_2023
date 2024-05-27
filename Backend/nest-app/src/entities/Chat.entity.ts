import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany } from '@mikro-orm/core';
import { User } from './User.entity';

@Entity()
export class Chat {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ nullable: true })
  avatar!: number | null;

  @ManyToOne({ fieldName: 'ownerid', joinColumn: 'id', entity: 'User' })
  owner!: User;
}