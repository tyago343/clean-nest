import { Module } from '@nestjs/common';
import { LoggerModule } from './shared/infrastructure/logger/logger.module';
import { ExceptionsModule } from './shared/infrastructure/exceptions/exceptions.module';
import { ProductUsecasesProxyModule } from './modules/Product/infrastructure/product.usecases.module';
import { ProductModule } from './modules/Product/infrastructure/product.module';
import { EnvironmentConfigModule } from './shared/infrastructure/config/environment-config/environment-config.module';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    ProductUsecasesProxyModule.register(),
    ProductModule,
    EnvironmentConfigModule,
  ],
})
export class AppModule {}
