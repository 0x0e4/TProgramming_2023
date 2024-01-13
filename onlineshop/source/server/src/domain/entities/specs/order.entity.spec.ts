import { OrderEntity } from '@shop-domain/entities/order.entity';

describe('order.entity', () => {
  it('should work', () => {
    const now = new Date();
    const order = new OrderEntity(1, now, 'created');

    expect(order.id).toBe(1);
    expect(order.date).toEqual(now);
    expect(order.status).toBe('created');
  });
});
