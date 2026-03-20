import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  //CreateDateColumn,
} from 'typeorm';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100, type: 'varchar' })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceHT: number;

  @Column({ default: 0 })
  stock: number;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: Date;
}
