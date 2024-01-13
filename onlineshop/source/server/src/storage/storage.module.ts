import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderStorage } from '@shop-storage/storages/order.storage';
import { OrderOrmEntity } from '@shop-storage/orm/order.orm.entity';
import { OrderFactory } from '@shop-storage/factories/order.factory';
import { OrderRepositorySymbol } from '@shop-domain/repositories/order.repository';

@Module({
  providers: [
    OrderFactory,
    {
      provide: OrderRepositorySymbol,
      useClass: OrderStorage,
    },
  ],
  exports: [OrderRepositorySymbol],
  imports: [TypeOrmModule.forFeature([OrderOrmEntity])],
})
export class StorageModule {}
