import React, { useContext } from "react";
import { Form, useLocation } from "react-router-dom";

import PlaceOrderInput from "./util/PlaceOrderInput.tsx";
import { Order } from "../../types/Order.ts";
import { createOrder } from "./util/http.ts";

const input = [
  "First name",
  "Last name",
  "Email address",
  "Street",
  "City",
  "State",
  "Zipcode",
  "Country",
  "Phone",
];

const PlaceOrder = () => {
  const { state } = useLocation();

  function onPlaceOrderClickHandler(event) {
    console.log(event);
  }

  return (
    <Form
      method="post"
      onSubmit={onPlaceOrderClickHandler}
      action="/place-order"
      className="grid h-screen grid-cols-2 pt-[5rem] max-sm:grid-cols-none max-sm:grid-rows-2 max-sm:h-fit max-sm:pt-[1rem]"
    >
      <div className="w-full h-full max-sm:h-fit">
        <div className="flex items-center w-full h-[10vh]">
          <h1 className="text-2xl w-fit">
            DELIVERY <strong>INFORMATION</strong>
          </h1>
          <div className="flex items-center w-fit h-full ml-[0.5rem]">
            <div className="h-[2px] w-[50px] bg-slate-950" />
          </div>
        </div>
        <div className="flex flex-col gap-[1rem] h-[90vh] w-full max-sm:h-fit">
          <input type="hidden" value={state.price} name="price" />
          <input type="hidden" value={JSON.stringify(state.cart)} name="cart" />
          {input.map((placeholder, index) => {
            return <PlaceOrderInput key={index} placeholder={placeholder} />;
          })}
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-3/5 max-sm:h-fit">
        <div className="w-full h-full">
          <div className="flex items-center w-full h-[10vh]">
            <h1 className="text-2xl">
              CART <strong>TOTALS</strong>
            </h1>
            <div className="flex items-center w-fit h-full ml-[0.5rem]">
              <div className="h-[2px] w-[50px] bg-slate-950" />
            </div>
          </div>
          <div className="flex w-full h-fit py-[1rem] border-b-2 gray-200">
            <h2 className="basis-3/4">Subtotal</h2>
            <h2 className="basis-1/4">$ {state.price - 10}</h2>
          </div>
          <div className="flex w-full h-fit py-[1rem] border-b-2 gray-200">
            <h2 className="basis-3/4">Shipping Fee</h2>
            <h2 className="basis-1/4">$ 10</h2>
          </div>
          <div className="flex w-full h-fit py-[1rem] border-b-2 gray-200 font-bold">
            <h2 className="basis-3/4">Total</h2>
            <h2 className="basis-1/4">$ {state.price}</h2>
          </div>
          <div className="flex justify-end w-full h-fit">
            <button className="bg-slate-950 w-1/2 my-[2rem] p-3 text-white max-xl:w-full">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default PlaceOrder;

export async function action({ request }) {
  const formData = await request.formData();

  const parsedData = JSON.parse(formData.get("cart"));

  const order = new Order(
    parsedData,
    formData.get("price"),
    formData.get("Street"),
    formData.get("City"),
    formData.get("State"),
    formData.get("Zipcode"),
    formData.get("Country"),
    formData.get("Phone")
  );

  const response = await createOrder(order);

}
