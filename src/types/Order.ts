import { Cart } from "./Cart";

export class Order {
  cart: Cart;
  price: number;
  streetName: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;

  constructor(
    cart: Cart,
    price: number,
    streetName: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    phone: string
  ) {
    this.cart = cart;
    this.price = price;
    this.streetName = streetName;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
    this.phone = phone;
  }
}
