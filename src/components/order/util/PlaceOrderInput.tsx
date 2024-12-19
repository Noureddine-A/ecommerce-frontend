import React from "react";

const PlaceOrderInput: React.FC<{
  placeholder: string;
}> = (props) => {
  return (
    <input
      type="text"
      name={props.placeholder}
      placeholder={props.placeholder}
      className="w-4/5 h-12 border-2 border-gray-200 pl-[0.5rem] rounded-md max-sm:w-full"
    />
  );
};

export default PlaceOrderInput;
