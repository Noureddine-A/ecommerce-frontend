import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import PlaceOrderInput from "./util/PlaceOrderInput.tsx";

const input = [
  "First name",
  "Last name",
  " Email address",
  " Street",
  "City",
  "State",
  "Zipcode",
  "Country",
  "Phone",
];

const PlaceOrder = () => {
  const { state } = useLocation();

  function onPlaceOrderClickHandler() {

  }

  return (
    <div className="grid h-screen grid-cols-2 pt-[5rem] max-sm:grid-cols-none max-sm:grid-rows-2 max-sm:h-fit max-sm:pt-[1rem]">
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
            <button
              onClick={onPlaceOrderClickHandler}
              className="bg-slate-950 w-1/2 my-[2rem] p-3 text-white max-xl:w-full"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
