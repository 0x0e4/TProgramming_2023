export class OrderEntity {
  constructor(public readonly id: number, public readonly date: Date, public readonly status: string) {}
}
