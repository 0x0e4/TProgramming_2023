import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  status: string;
}
