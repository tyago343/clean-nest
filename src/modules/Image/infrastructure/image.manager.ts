import { Injectable } from '@nestjs/common';
import Image from '../domain/Image';
import ImageManager from '../domain/image.manager';
import { MultipartFile } from '@fastify/multipart';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageManagerImpl implements ImageManager {
  async saveTemporalImage(data: MultipartFile): Promise<Image> {
    const newName = data.filename.replace(/ /g, '_');
    const savePath = path.resolve('public/images/tmp', newName);
    const fileStream = fs.createWriteStream(savePath);
    await new Promise((resolve, reject) => {
      data.file.pipe(fileStream);
      data.file.on('end', resolve);
      data.file.on('error', reject);
    });
    return new Image(newName, savePath);
  }
  removeTemporalImage(route: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findTemporalImageByPath(route: string): Promise<Image | null> {
    throw new Error('Method not implemented.');
  }
  saveImage(image: Image): Promise<Image> {
    throw new Error('Method not implemented.');
  }
  removeImage(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findImageById(id: string): Promise<Image | null> {
    throw new Error('Method not implemented.');
  }
  findAllImages(): Promise<Image[]> {
    throw new Error('Method not implemented.');
  }
}
