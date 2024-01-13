import { OrderOrmEntity } from '@shop-storage/orm/order.orm.entity';

export const initialOrders: OrderOrmEntity[] = [
  {
    id: 1,
    date: new Date(),
    status: 'none',
  },
  {
    id: 2,
    date: new Date(),
    status: 'none',
  },
];
