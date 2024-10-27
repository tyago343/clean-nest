import { Module } from '@nestjs/common';
import { LoggerModule } from '@logger/logger.module';
import { ExceptionsModule } from '@exceptions/exceptions.module';
import { ProductModule } from '@product/infrastructure/product.module';
import { EnvironmentConfigModule } from '@config/environment-config/environment-config.module';
import { TypeormConfigModule } from '@config/typeorm/typeorm.module';
import { ImageModule } from '@modules/Image/infrastructure/image.module';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    ProductModule,
    ImageModule,
    EnvironmentConfigModule,
    TypeormConfigModule,
  ],
})
export class AppModule {}
