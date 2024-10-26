import { addProductUseCases } from './create.product';
import Product from '@product/domain/Product';
import ProductRepository from '@product/domain/product.repository';

describe('addProductUseCases', () => {
  let productRepository: ProductRepository;
  let useCases: addProductUseCases;

  beforeEach(() => {
    productRepository = {
      save: jest.fn(),
    } as unknown as ProductRepository;
    useCases = new addProductUseCases(productRepository);
  });

  it('should create and save a product', async () => {
    const productData = {
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
      images: ['image1.jpg', 'image2.jpg'],
    };

    const result = await useCases.execute(productData);

    expect(result).toBeInstanceOf(Product);
    expect(result.name).toBe(productData.name);
    expect(result.price).toBe(productData.price);
    expect(result.description).toBe(productData.description);
    expect(result.images).toBe(productData.images);
    expect(productRepository.save).toHaveBeenCalledWith(result);
  });

  it('should create and save a product without images', async () => {
    const productData = {
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
    };

    const result = await useCases.execute(productData);

    expect(result).toBeInstanceOf(Product);
    expect(result.name).toBe(productData.name);
    expect(result.price).toBe(productData.price);
    expect(result.description).toBe(productData.description);
    expect(result.images).toEqual([]);
    expect(productRepository.save).toHaveBeenCalledWith(result);
  });
});
