import { getAllProductUseCases } from './findAll.product';
import ProductRepository from '@product/domain/product.repository';
import Product from '@product/domain/Product';

describe('getAllProductUseCases', () => {
  let productRepository: ProductRepository;
  let getAllProducts: getAllProductUseCases;

  beforeEach(() => {
    productRepository = {
      findAll: jest.fn(),
    } as unknown as ProductRepository;
    getAllProducts = new getAllProductUseCases(productRepository);
  });

  it('should return an array of products', async () => {
    const products: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Product 2',
        price: 200,
        description: 'Description 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    (productRepository.findAll as jest.Mock).mockResolvedValue(products);

    const result = await getAllProducts.execute();

    expect(result).toEqual(products);
    expect(productRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array if no products are found', async () => {
    (productRepository.findAll as jest.Mock).mockResolvedValue([]);

    const result = await getAllProducts.execute();

    expect(result).toEqual([]);
    expect(productRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the repository throws an error', async () => {
    const error = new Error('Repository error');
    (productRepository.findAll as jest.Mock).mockRejectedValue(error);

    await expect(getAllProducts.execute()).rejects.toThrow('Repository error');
    expect(productRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
