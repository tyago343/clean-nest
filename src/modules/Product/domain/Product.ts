class Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    price: number,
    description: string,
    images: string[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = generateUUID();
    this.name = name;
    this.price = price;
    this.description = description;
    this.images = images;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default Product;
