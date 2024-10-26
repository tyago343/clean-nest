import Product from '../../domain/Product';
import ProductRepository from '../../domain/product.repository';

export class UpdateProductUseCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: {
    id: string;
    name?: string;
    price?: number;
    description?: string;
    images?: string[];
  }): Promise<Product> {
    const product = await this.productRepository.findById(data.id);
    if (!product) {
      throw new Error('Product not found');
    }
    const { name, price, description, images } = data;

    if (name) {
      product.name = name;
    }
    if (price) {
      product.price = price;
    }
    if (description) {
      product.description = description;
    }
    if (images) {
      product.images = images;
    }

    await this.productRepository.save(product);

    return product;
  }
}
