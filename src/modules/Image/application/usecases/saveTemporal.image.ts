import Image from '@image/domain/Image';
import ImageManager from '@modules/Image/domain/image.manager';

export class saveTemporalImageUseCases {
  constructor(private readonly imageManager: ImageManager) {}

  async execute(data: unknown): Promise<Image> {
    return await this.imageManager.saveTemporalImage(data);
  }
}
