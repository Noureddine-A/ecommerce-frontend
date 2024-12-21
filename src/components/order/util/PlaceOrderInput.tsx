import React, { useEffect, useState } from "react";
import { Error } from "../../../types/Error";

const PlaceOrderInput: React.FC<{
  placeholder: string;
  area: string;
  error: Error[] | undefined;
}> = (props) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setError(null);
    }
    if (props.error !== undefined) {
      props.error.forEach((err) => {
        if (err.errorArea === props.area) {
          setError(err.errorMsg);
        }
      });
    }
  }, [props.error]);

  return (
    <>
      {error === null ? (
        <input
          type="text"
          name={props.placeholder}
          placeholder={props.placeholder}
          className="w-4/5 h-12 border-2 border-gray-200 pl-[0.5rem] outline-none rounded-md max-sm:w-full"
        />
      ) : (
        <div className="flex w-4/5 h-12 border-2 border-red-400 rounded-md max-sm:w-full">
          <input
            className="w-4/5 h-full pl-[0.5rem] outline-none"
            placeholder={props.placeholder}
            name={props.placeholder}
          />
          <div className="flex items-center w-1/5 h-full text-red-400">
            {error}
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrderInput;
