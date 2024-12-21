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
  firstName: string;
  lastName: string;
  email: string;

  constructor(
    cart: Cart,
    price: number,
    streetName: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    phone: string,
    firstName: string,
    lastName: string,
    email: string
  ) {
    this.cart = cart;
    this.price = price;
    this.streetName = streetName;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
    this.phone = phone;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
