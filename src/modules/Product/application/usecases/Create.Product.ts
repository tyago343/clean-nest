import Product from '../../domain/Product';
import ProductRepository from '../../domain/Product.repository';

export class addTodoUseCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(content: string): Promise<void> {
    const product = new Product();
    product.name = content;
    await this.productRepository.save(product);
  }
}
