import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigModule } from 'src/shared/infrastructure/config/typeorm/typeorm.module';
import { Product } from '../product.entity';
import { DatabaseProductRepository } from './product.repository';

@Module({
  imports: [TypeormConfigModule, TypeOrmModule.forFeature([Product])],
  providers: [DatabaseProductRepository],
  exports: [DatabaseProductRepository],
})
export class ProductRepositoriesModule {}
