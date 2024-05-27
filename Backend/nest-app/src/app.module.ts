import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/User.entity';
import { Message } from './entities/Message.entity';
import { Media } from './entities/Media.entity';
import { Chat } from './entities/Chat.entity';
import { SentMedia } from './entities/SentMedia.entity';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { UserController } from './User/User.controller';
import { UserService } from './User/User.service';
import { DialogsController } from './dialogs/dialogs.controller';
import { DialogsService } from './dialogs/dialogs.service';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({ entities: [User, Media, Message, Chat, SentMedia] }),
  ],
  controllers: [MessagesController, UserController, DialogsController],
  providers: [UserService, MessagesService, DialogsService],
})
export class AppModule {}