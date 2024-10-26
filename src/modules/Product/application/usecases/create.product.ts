import Product from '@product/domain/Product';
import ProductRepository from '@product/domain/product.repository';

export class addProductUseCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    name,
    price,
    description,
    images,
  }: {
    name: string;
    price: number;
    description: string;
    images?: string[];
  }): Promise<Product> {
    const product = new Product(name, price, description, images);
    await this.productRepository.save(product);
    return product;
  }
}
