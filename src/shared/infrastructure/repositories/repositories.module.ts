import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/Product/infrastructure/product.entity';
import { DatabaseProductRepository } from 'src/modules/Product/infrastructure/repositories/product.repository';
import { TypeormConfigModule } from '../config/typeorm/typeorm.module';
@Module({
  imports: [TypeormConfigModule, TypeOrmModule.forFeature([Product])],
  providers: [DatabaseProductRepository],
  exports: [DatabaseProductRepository],
})
export class RepositoriesModule {}
