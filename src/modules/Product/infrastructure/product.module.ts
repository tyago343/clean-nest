import { Module } from '@nestjs/common';
import { ProductUsecasesProxyModule } from '@product/infrastructure/product.usecases.module';
import { ProductController } from '@product/infrastructure/product.controller';

@Module({
  imports: [ProductUsecasesProxyModule.register()],
  controllers: [ProductController],
})
export class ProductModule {}
