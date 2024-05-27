import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from '../entities/Message.entity';
import * as moment from 'moment';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':ownerid/:receiveid')
  async getMessagesByUserId(@Param('ownerid', ParseIntPipe) ownerid: number, @Param('receiveid', ParseIntPipe) receiveid: number, @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number, @Query('limit', new DefaultValuePipe(30), ParseIntPipe) limit: number): Promise<Message[]> {
    return this.messagesService.findMessages(ownerid, receiveid);
  }

  @Post()
  async createMessage(@Body() data: Message): Promise<Message> {
    data.time = moment().unix();
    return this.messagesService.createMessage(data);
  }
}