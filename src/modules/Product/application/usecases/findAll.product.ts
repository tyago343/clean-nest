import Product from '../../domain/Product';
import ProductRepository from '../../domain/product.repository';

export class getAllProductUseCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
