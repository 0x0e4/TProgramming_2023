import { Module } from '@nestjs/common';

import { DomainModule } from '@shop-domain/domain.module';
import { OrderController } from '@shop-rest/order.controller';

@Module({
  imports: [DomainModule],
  controllers: [OrderController],
})
export class RestModule {}
