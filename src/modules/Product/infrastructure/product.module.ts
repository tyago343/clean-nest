import { Module } from '@nestjs/common';
import { ProductUsecasesProxyModule } from './product.usecases.module';
import { ProductController } from './product.controller';

@Module({
  imports: [ProductUsecasesProxyModule.register()],
  controllers: [ProductController],
})
export class ProductModule {}
