import { Module } from '@nestjs/common';

import { OrderService } from '@shop-domain/services/order.service';
import { OrderFactory } from '@shop-domain/factories/order.factory';
import { StorageModule } from '@shop-storage/storage.module';

@Module({
  providers: [OrderService, OrderFactory],
  exports: [OrderService],
  imports: [StorageModule],
})
export class DomainModule {}
