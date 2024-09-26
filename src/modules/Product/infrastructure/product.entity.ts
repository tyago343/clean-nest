import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({nullable: false})
    name: string;
    @Column({nullable: false})
    price: number;
    @Column({nullable: false})
    description: string;
    @Column('simple-array', {nullable: true})
    images: string[];
}
