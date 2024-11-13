import React, { useEffect, useState } from "react";

const AuthInput = ({ placeholder, error}) => {
  const [inputError, setInputError] = useState({ err: false, errorMsg: null });

  let type = "text";

  if (placeholder === "Password") {
    type = "password";
  }

  useEffect(() => { 
    setInputError({ err: false, errorMsg: null });

    const uncapitalized =
      placeholder.charAt(0).toLowerCase() + placeholder.slice(1);

    if (error !== undefined) {
      error.forEach((error) => {
        if (error.errorArea === uncapitalized) {
          return setInputError({ err: true, errorMsg: error.errorMsg });
        }
      });
    }

  }, [error, placeholder]);

  return (
    <div className="flex w-full h-16">
      <input
        className={
          inputError.err === false
            ? "w-full h-full outline-none border-b-2 border-gray-300"
            : "w-3/5 h-full outline-none border-b-2 border-red-500"
        }
        type={type}
        name={placeholder}
        placeholder={placeholder}
      />
      {inputError.err === true && (
        <div className="flex items-center w-2/5 h-full outline-none border-b-2 border-red-500">
          <p className="text-red-500">{inputError.errorMsg}</p>
        </div>
      )}
    </div>
  );
};

export default AuthInput;
