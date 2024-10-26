import Product from '@product/domain/Product';
import ProductRepository from '@product/domain/product.repository';

export class getAllProductUseCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
