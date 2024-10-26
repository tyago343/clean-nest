import ProductRepository from '@modules/Product/domain/product.repository';
import { getByIdProductUseCases } from './findById.product';
import Product from '@modules/Product/domain/Product';

describe('getByIdProductUseCases', () => {
  let productRepository: ProductRepository;
  let getByIdProduct: getByIdProductUseCases;

  beforeEach(() => {
    productRepository = {
      findById: jest.fn(),
    } as unknown as ProductRepository;
    getByIdProduct = new getByIdProductUseCases(productRepository);
  });

  it('should return a product when found', async () => {
    const product: Product = {
      id: '1',
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (productRepository.findById as jest.Mock).mockResolvedValue(product);

    const result = await getByIdProduct.execute('1');

    expect(result).toEqual(product);
    expect(productRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should return null when product is not found', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue(null);

    const result = await getByIdProduct.execute('1');

    expect(result).toBeNull();
    expect(productRepository.findById).toHaveBeenCalledWith('1');
  });
});
