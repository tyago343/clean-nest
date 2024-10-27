import Image from './Image';

interface ImageManager {
  saveTemporalImage(image: Image): Promise<Image>;
  removeTemporalImage(route: string): Promise<void>;
  findTemporalImageByPath(route: string): Promise<Image | null>;
  saveImage(image: Image): Promise<Image>;
  removeImage(id: string): Promise<void>;
  findImageById(id: string): Promise<Image | null>;
  findAllImages(): Promise<Image[]>;
}

export default ImageManager;
