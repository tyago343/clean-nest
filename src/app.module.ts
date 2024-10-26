import { Module } from '@nestjs/common';
import { LoggerModule } from './shared/infrastructure/logger/logger.module';
import { ExceptionsModule } from './shared/infrastructure/exceptions/exceptions.module';
import { ProductModule } from './modules/Product/infrastructure/product.module';
import { EnvironmentConfigModule } from './shared/infrastructure/config/environment-config/environment-config.module';
import { TypeormConfigModule } from './shared/infrastructure/config/typeorm/typeorm.module';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    ProductModule,
    EnvironmentConfigModule,
    TypeormConfigModule,
  ],
})
export class AppModule {}
