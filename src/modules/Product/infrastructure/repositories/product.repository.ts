import { Injectable } from '@nestjs/common';
import ProductRepository from '../../domain/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class DatabaseProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productEntityRepository: Repository<Product>,
  ) {}
  async save(product: Product): Promise<Product> {
    const productEntity = this.productEntityRepository.create(product);
    const savedProduct = await this.productEntityRepository.save(productEntity);
    return savedProduct;
  }
  async findByName(name: string): Promise<Product | null> {
    const product = await this.productEntityRepository.findOne({
      where: {
        name,
      },
    });
    if (!product) {
      return null;
    }
    return product;
  }
  async findById(id: string): Promise<Product | null> {
    const product = await this.productEntityRepository.findOne({
      where: { id },
    });
    if (!product) {
      return null;
    }
    return product;
  }
  async remove(id: string): Promise<void> {
    await this.productEntityRepository.delete({ id });
  }
  async update(id: string, product: Product): Promise<Product | null> {
    const savedProduct = this.findById(id);
    if (!savedProduct) {
      return null;
    }
    const newProduct = { ...savedProduct, ...product };
    const updatedProduct = await this.productEntityRepository.save(newProduct);
    return updatedProduct;
  }
  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
}
