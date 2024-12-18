import { Cart } from "./Cart";
import { User } from "./User";

export class Order {
  cart: Cart;
  price: number;
  user: User;
  streetName: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;

  constructor(
    cart: Cart,
    user: User,
    price: number,
    streetName: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    phone: string
  ) {
    this.cart = cart;
    this.user = user;
    this.price = price;
    this.streetName = streetName;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
    this.phone = phone;
  }
}
