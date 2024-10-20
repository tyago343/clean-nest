import { DynamicModule, Module } from '@nestjs/common';
import { addProductUseCases } from '../application/usecases/create.product';

import { ExceptionsModule } from 'src/shared/infrastructure/exceptions/exceptions.module';
import { LoggerModule } from 'src/shared/infrastructure/logger/logger.module';
import { LoggerService } from 'src/shared/infrastructure/logger/logger.service';
import { ProductRepositoriesModule } from './repositories/product.repository.module';

import { DatabaseProductRepository } from './repositories/product.repository';
import { UseCaseProxy } from '../../../shared/infrastructure/usecases.proxy';
@Module({
  imports: [ProductRepositoriesModule, LoggerModule, ExceptionsModule],
})
export class ProductUsecasesProxyModule {
  static POST_PRODUCT_USECASES_PROXY = 'postProductUsecasesProxy';
  static register(): DynamicModule {
    return {
      module: ProductUsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: ProductUsecasesProxyModule.POST_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: DatabaseProductRepository,
          ) => {
            return new UseCaseProxy(new addProductUseCases(productRepository));
          },
        },
      ],
      exports: [ProductUsecasesProxyModule.POST_PRODUCT_USECASES_PROXY],
    };
  }
}
