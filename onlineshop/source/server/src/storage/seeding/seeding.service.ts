import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { OrderOrmEntity } from '@shop-storage/orm/order.orm.entity';
import { initialOrders } from '@shop-storage/seeding/orders.seeds';

@Injectable()
export class SeedingService {
  constructor(private readonly entityManager: EntityManager) {}

  async seed(): Promise<void> {
    await Promise.all([this.entityManager.save(OrderOrmEntity, [...initialOrders])]);
  }
}
