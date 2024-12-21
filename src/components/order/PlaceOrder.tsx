import React, { useContext, useEffect, useState } from "react";
import { Form, useActionData, useLocation } from "react-router-dom";

import PlaceOrderInput from "./util/PlaceOrderInput.tsx";
import { Order } from "../../types/Order.ts";
import { createOrder } from "./util/http.ts";
import { Error } from "../../types/Error.ts";
import { Response } from "../../types/Response.ts";

import { TailSpin } from "react-loader-spinner";
import { getCart } from "../util/util.ts";
import { CartContext } from "../store/CartContext.tsx";

const input = [
  {
    placeholder: "First name",
    area: "firstName",
  },
  {
    placeholder: "Last name",
    area: "lastName",
  },
  {
    placeholder: "Email address",
    area: "email",
  },
  {
    placeholder: "Street",
    area: "streetName",
  },
  {
    placeholder: "City",
    area: "city",
  },
  {
    placeholder: "Zipcode",
    area: "zipCode",
  },
  {
    placeholder: "Country",
    area: "country",
  },
  {
    placeholder: "Phone",
    area: "Phone",
  },
];

const PlaceOrder = () => {
  const { state } = useLocation();
  const [error, setError] = useState<Error[]>();
  const [loading, setLoading] = useState<boolean>();

  const cartContext = useContext(CartContext);

  const actionData = useActionData() as Response;

  useEffect(() => {
    let errorList: Error[] = [];

    if (actionData !== null && actionData?.error === true) {
      Object.keys(actionData?.message).forEach((key) => {
        errorList.push({
          errorMsg: actionData.message[key][0],
          errorArea: key,
        });
      });
    }

    setLoading(false);
    setError(errorList);
  }, [actionData]);

  function onPlaceOrderClickHandler() {
    setLoading(true);
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
          <input
            type="hidden"
            value={cartContext.calculateCartPrice()}
            name="price"
          />
          <input type="hidden" value={JSON.stringify(getCart())} name="cart" />
          {input.map((placeholder, index) => {
            return (
              <PlaceOrderInput
                key={index}
                placeholder={placeholder.placeholder}
                area={placeholder.area}
                error={error}
              />
            );
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
            <h2 className="basis-1/4">$ {cartContext.calculateCartPrice()}</h2>
          </div>
          <div className="flex w-full h-fit py-[1rem] border-b-2 gray-200">
            <h2 className="basis-3/4">Shipping Fee</h2>
            <h2 className="basis-1/4">$ 10</h2>
          </div>
          <div className="flex w-full h-fit py-[1rem] border-b-2 gray-200 font-bold">
            <h2 className="basis-3/4">Total</h2>
            <h2 className="basis-1/4">
              $ {cartContext.calculateCartPrice() + 10}
            </h2>
          </div>
          <div className="flex justify-center w-full h-fit">
            {loading ? (
              <TailSpin height="60" width="60" radius="4" color="black" />
            ) : (
              <button className="bg-slate-950 w-1/2 my-[2rem] p-3 text-white max-xl:w-full">
                PLACE ORDER
              </button>
            )}
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
    formData.get("Phone"),
    formData.get("First name"),
    formData.get("Last name"),
    formData.get("Email address")
  );

  const response = await createOrder(order);

  return response;
}
