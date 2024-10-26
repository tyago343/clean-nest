import { DynamicModule, Module } from '@nestjs/common';
import { addProductUseCases } from '@product/application/usecases/create.product';

import { ExceptionsModule } from '@exceptions/exceptions.module';
import { LoggerModule } from '@logger/logger.module';
import { LoggerService } from '@logger/logger.service';

import { DatabaseProductRepository } from '@product/infrastructure/product.repository';
import { UseCaseProxy } from '@shared/infrastructure/usecases.proxy';
import { EnvironmentConfigModule } from '@config/environment-config/environment-config.module';
import { RepositoriesModule } from '@repositories/repositories.module';
import { getAllProductUseCases } from '@product/application/usecases/findAll.product';
import { getByIdProductUseCases } from '@product/application/usecases/findById.product';
import { UpdateProductUseCases } from '@product/application/usecases/update.product';

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
  static UPDATE_PRODUCT_USECASES_PROXY = 'updateProductUsecasesProxy';
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
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: ProductUsecasesProxyModule.UPDATE_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: DatabaseProductRepository,
          ) => {
            return new UseCaseProxy(
              new UpdateProductUseCases(productRepository),
            );
          },
        },
      ],
      exports: [
        ProductUsecasesProxyModule.POST_PRODUCT_USECASES_PROXY,
        ProductUsecasesProxyModule.GET_ALL_PRODUCTS_USECASES_PROXY,
        ProductUsecasesProxyModule.GET_PRODUCT_BY_ID_USECASES_PROXY,
        ProductUsecasesProxyModule.UPDATE_PRODUCT_USECASES_PROXY,
      ],
    };
  }
}
