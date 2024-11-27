export class Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  subCategory: string;
  sizes: string[];
  images: string[];

  constructor(
    id: number,
    name: string,
    price: number,
    description: string,
    category: string,
    subCategory: string,
    sizes: string[],
    images: string[]
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.subCategory = subCategory;
    this.sizes = sizes;
    this.images = images;
  }
}
