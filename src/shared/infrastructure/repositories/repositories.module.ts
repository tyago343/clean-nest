import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@product/infrastructure/product.entity';
import { DatabaseProductRepository } from '@product/infrastructure/product.repository';
import { TypeormConfigModule } from '@config/typeorm/typeorm.module';

@Module({
  imports: [TypeormConfigModule, TypeOrmModule.forFeature([Product])],
  providers: [DatabaseProductRepository],
  exports: [DatabaseProductRepository],
})
export class RepositoriesModule {}
