import { Controller, Inject, Post, Req } from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ImageUsecasesProxyModule } from './image.usecases.module';
import { UseCaseProxy } from '@shared/infrastructure/usecases.proxy';
import { saveTemporalImageUseCases } from '../application/usecases/saveTemporal.image';

import { FastifyRequest } from 'fastify';

@Controller('images')
@ApiTags('Images')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class ImageController {
  constructor(
    @Inject(ImageUsecasesProxyModule.SAVE_TEMPORAL_IMAGE_USECASES_PROXY)
    private readonly saveTemporalImageUsecasesProxy: UseCaseProxy<saveTemporalImageUseCases>,
  ) {}
  @Post('/tmp')
  @ApiOperation({
    summary: 'Save a temporal image',
  })
  @ApiResponse({
    status: 201,
    description: 'Temporal image saved',
  })
  @ApiConsumes('multipart/form-data')
  async saveTemporalImage(@Req() req: FastifyRequest) {
    const data = await req.file();
    if (!data) {
      return { message: 'No file uploaded' };
    }
    const newImage = await this.saveTemporalImageUsecasesProxy
      .getInstance()
      .execute(data);
    return { message: 'File saved successfully', image: newImage };
  }
}
