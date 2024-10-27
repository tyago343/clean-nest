import Image from '@image/domain/Image';
import ImageManager from '@modules/Image/domain/image.manager';

export class saveTemporalImageUseCases {
  constructor(private readonly imageManager: ImageManager) {}

  async execute({
    id,
    name,
    url,
  }: {
    id: string;
    name: string;
    url: string;
  }): Promise<Image> {
    const image = new Image(id, name, url);
    return await this.imageManager.saveTemporalImage(image);
  }
}
