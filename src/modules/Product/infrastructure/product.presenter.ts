import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

export class ProductPresenter {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Product Name' })
  name: string;

  @ApiProperty({ example: 99.99 })
  price: number;

  @ApiProperty({ example: 'This is a product description.' })
  description: string;

  @ApiProperty({ example: ['image1.jpg', 'image2.jpg'] })
  images?: string[];

  @ApiProperty({ example: '2024-10-20T10:37:57.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-10-20T10:37:57.000Z' })
  updatedAt: Date;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.images = product.images;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }

  static fromEntity(product: Product): ProductPresenter {
    return new ProductPresenter(product);
  }
}
