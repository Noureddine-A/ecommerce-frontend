export class Product {
  name: string;
  price: number;
  description: string;
  category: string;
  subCategory: string;
  sizes: string[];
  images: string[];
  id: number;

  constructor(
    name: string,
    price: number,
    description: string,
    category: string,
    subCategory: string,
    sizes: string[],
    images: string[]
  ) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.subCategory = subCategory;
    this.sizes = sizes;
    this.images = images;
  }

  setProductId(id: number) {
    this.id = id;
  }
}
