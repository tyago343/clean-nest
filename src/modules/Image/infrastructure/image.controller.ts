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
// import { MemoryStorageFile } from '@blazity/nest-file-fastify';

// import { pipeline } from 'stream';
import { FastifyRequest } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';

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
    const savePath = path.resolve('public/images/tmp', data.filename);
    const fileStream = fs.createWriteStream(savePath);
    await new Promise((resolve, reject) => {
      data.file.pipe(fileStream);
      data.file.on('end', resolve);
      data.file.on('error', reject);
    });
    console.log('File saved successfully', this.saveTemporalImageUsecasesProxy);
    return { message: 'File saved successfully', path: savePath };
  }
}
