import Product from './Product';

export default interface ProductRepository {
  save(product: Product): Promise<void>;
  findByName(name: string): Promise<Product>;
  findById(id: string): Promise<Product>;
  remove(id: string): Promise<void>;
  update(id: string, product: Product): Promise<void>;
  findAll(): Promise<Product[]>;
}
