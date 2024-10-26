import { UpdateProductUseCases } from './update.product';
import ProductRepository from '@product/domain/product.repository';
import Product from '@product/domain/Product';

describe('UpdateProductUseCases', () => {
  let updateProductUseCases: UpdateProductUseCases;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    productRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<ProductRepository>;

    updateProductUseCases = new UpdateProductUseCases(productRepository);
  });

  it('should update the product successfully', async () => {
    const product = new Product('Old Name', 100, 'Old Description', [
      'old-image.jpg',
    ]);
    productRepository.findById.mockResolvedValue(product);
    productRepository.save.mockResolvedValue(product);

    const updatedProduct = await updateProductUseCases.execute({
      id: product.id,
      name: 'New Name',
      price: 200,
      description: 'New Description',
      images: ['new-image.jpg'],
    });

    expect(updatedProduct.name).toBe('New Name');
    expect(updatedProduct.price).toBe(200);
    expect(updatedProduct.description).toBe('New Description');
    expect(updatedProduct.images).toEqual(['new-image.jpg']);
    expect(productRepository.findById).toHaveBeenCalledWith(product.id);
    expect(productRepository.save).toHaveBeenCalledWith(product);
  });

  it('should throw an error if the product is not found', async () => {
    productRepository.findById.mockResolvedValue(null);

    await expect(
      updateProductUseCases.execute({
        id: '1',
      }),
    ).rejects.toThrow('Product not found');
  });

  it('should update only the provided fields', async () => {
    const product = new Product('Old Name', 100, 'Old Description', [
      'old-image.jpg',
    ]);
    productRepository.findById.mockResolvedValue(product);
    productRepository.save.mockResolvedValue(product);

    const updatedProduct = await updateProductUseCases.execute({
      id: product.id,
      name: 'New Name',
    });

    expect(updatedProduct.name).toBe('New Name');
    expect(updatedProduct.price).toBe(100);
    expect(updatedProduct.description).toBe('Old Description');
    expect(updatedProduct.images).toEqual(['old-image.jpg']);
    expect(productRepository.findById).toHaveBeenCalledWith(product.id);
    expect(productRepository.save).toHaveBeenCalledWith(product);
  });
});
