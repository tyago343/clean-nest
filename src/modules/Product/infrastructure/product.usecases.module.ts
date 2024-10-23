import { DynamicModule, Module } from '@nestjs/common';
import { addProductUseCases } from '../application/usecases/create.product';

import { ExceptionsModule } from 'src/shared/infrastructure/exceptions/exceptions.module';
import { LoggerModule } from 'src/shared/infrastructure/logger/logger.module';
import { LoggerService } from 'src/shared/infrastructure/logger/logger.service';

import { DatabaseProductRepository } from './product.repository';
import { UseCaseProxy } from '../../../shared/infrastructure/usecases.proxy';
import { EnvironmentConfigModule } from 'src/shared/infrastructure/config/environment-config/environment-config.module';
import { RepositoriesModule } from 'src/shared/infrastructure/repositories/repositories.module';
import { getAllProductUseCases } from '../application/usecases/findAll.product';
import { getByIdProductUseCases } from '../application/usecases/findById.product';
@Module({
  imports: [
    LoggerModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class ProductUsecasesProxyModule {
  static POST_PRODUCT_USECASES_PROXY = 'postProductUsecasesProxy';
  static GET_ALL_PRODUCTS_USECASES_PROXY = 'getAllProductsUsecasesProxy';
  static GET_PRODUCT_BY_ID_USECASES_PROXY = 'getProductByIdUsecasesProxy';
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
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: ProductUsecasesProxyModule.GET_ALL_PRODUCTS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: DatabaseProductRepository,
          ) => {
            return new UseCaseProxy(
              new getAllProductUseCases(productRepository),
            );
          },
        },
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: ProductUsecasesProxyModule.GET_PRODUCT_BY_ID_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: DatabaseProductRepository,
          ) => {
            return new UseCaseProxy(
              new getByIdProductUseCases(productRepository),
            );
          },
        },
      ],
      exports: [
        ProductUsecasesProxyModule.POST_PRODUCT_USECASES_PROXY,
        ProductUsecasesProxyModule.GET_ALL_PRODUCTS_USECASES_PROXY,
        ProductUsecasesProxyModule.GET_PRODUCT_BY_ID_USECASES_PROXY,
      ],
    };
  }
}
