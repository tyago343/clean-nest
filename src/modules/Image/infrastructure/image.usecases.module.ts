import { DynamicModule, Module } from '@nestjs/common';

import { saveTemporalImageUseCases } from '@image/application/usecases/saveTemporal.image';

import { LoggerModule } from '@logger/logger.module';
import { LoggerService } from '@logger/logger.service';
import { ExceptionsModule } from '@exceptions/exceptions.module';
import { EnvironmentConfigModule } from '@shared/infrastructure/config/environment-config/environment-config.module';
import { RepositoriesModule } from '@shared/infrastructure/repositories/repositories.module';
import { UseCaseProxy } from '@shared/infrastructure/usecases.proxy';
import { ImageManagerImpl } from './image.manager';

@Module({
  imports: [
    LoggerModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class ImageUsecasesProxyModule {
  static SAVE_TEMPORAL_IMAGE_USECASES_PROXY = 'saveTemporalImageUsecasesProxy';
  static register(): DynamicModule {
    return {
      module: ImageUsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService],
          provide: ImageUsecasesProxyModule.SAVE_TEMPORAL_IMAGE_USECASES_PROXY,
          useFactory: (logger: LoggerService) => {
            return new UseCaseProxy(
              new saveTemporalImageUseCases(new ImageManagerImpl()),
            );
          },
        },
      ],
      exports: [ImageUsecasesProxyModule.SAVE_TEMPORAL_IMAGE_USECASES_PROXY],
    };
  }
}
