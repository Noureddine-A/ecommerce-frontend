import { Product } from "./Product";

export type Cart = CartItem[];

export type CartItem = {
  product: Product;
  sizes: {
    sizeName: string;
    quantity: number;
  }[];
} | null;
