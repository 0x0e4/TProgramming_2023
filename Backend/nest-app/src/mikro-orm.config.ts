import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { User } from './entities/User.entity';
import { Message } from './entities/Message.entity';
import { MySqlDriver } from '@mikro-orm/mysql';
import { Media } from './entities/Media.entity';
import { Chat } from './entities/Chat.entity';
import { SentMedia } from './entities/SentMedia.entity';

export default {
  dbName: 'dbName',
  driver: MySqlDriver,
  host: 'host', // Адрес вашего MySQL сервера
  port: 3306, // Порт вашего MySQL сервера
  user: 'user',
  password: 'pass',
  highlighter: new SqlHighlighter(),
  debug: true,
  entities: [User, Media, Message, Chat, SentMedia]
} as Parameters<typeof MikroORM.init>[0];