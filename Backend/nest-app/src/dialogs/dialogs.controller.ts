import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { DialogsService } from './dialogs.service';
import { Message } from '../entities/Message.entity';
import { Dialog } from './dialogs';

@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @Get(':ownerid')
  async getDialogsByUserId(@Param('ownerid', ParseIntPipe) ownerid: number, @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number, @Query('limit', new DefaultValuePipe(30), ParseIntPipe) limit: number): Promise<Dialog[]> {
    return this.dialogsService.findDialogs(ownerid, limit, offset);
  }
}