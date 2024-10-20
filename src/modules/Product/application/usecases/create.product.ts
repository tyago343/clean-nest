import Product from '../../domain/Product';
import ProductRepository from '../../domain/product.repository';

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
    const product = new Product();
    product.name = name;
    product.price = price;
    product.description = description;
    product.images = images;
    await this.productRepository.save(product);
    return product;
  }
}
