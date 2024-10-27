import { Module } from '@nestjs/common';
import { ImageUsecasesProxyModule } from './image.usecases.module';
import { ImageController } from './image.controller';

@Module({
  imports: [ImageUsecasesProxyModule.register()],
  controllers: [ImageController],
})
export class ImageModule {}
