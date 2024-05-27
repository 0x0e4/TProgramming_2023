import { Entity, PrimaryKey, PrimaryKeyProp, ManyToOne } from '@mikro-orm/core';
import { Message } from './Message.entity';
import { Media } from './Media.entity';

@Entity()
export class SentMedia {

  @ManyToOne({ fieldName: 'messageid', joinColumn: 'id', entity: 'Message', primary: true })
  messages!: Message;

  @ManyToOne({ fieldName: 'mediaid', joinColumn: 'id', entity: 'Media', primary: true })
  media!: Media;

  [PrimaryKeyProp]?: ['messageid', 'mediaid'];
}