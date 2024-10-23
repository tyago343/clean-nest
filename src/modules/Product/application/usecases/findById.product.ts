import Product from '../../domain/Product';
import ProductRepository from '../../domain/product.repository';

export class getByIdProductUseCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}
