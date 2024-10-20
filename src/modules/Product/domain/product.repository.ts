import Product from './Product';

export default interface ProductRepository {
  save(product: Product): Promise<Product>;
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  remove(id: string): Promise<void>;
  update(id: string, product: Product): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}
