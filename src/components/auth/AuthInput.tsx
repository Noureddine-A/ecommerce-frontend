import React, { useEffect, useState } from "react";
import { Error } from "../../types/Error";
type InputError = {
  err: boolean;
  errorMsg: string | null;
};

const AuthInput: React.FC<{
  key: number;
  placeholder: string;
  error: Error[] | undefined;
  pathname: string;
}> = (props) => {
  const [inputError, setInputError] = useState<InputError>();

  let type = "text";

  if (props.placeholder === "Password") {
    type = "password";
  }

  useEffect(() => {
    setInputError({ err: false, errorMsg: "" });

    const uncapitalized =
      props.placeholder.charAt(0).toLowerCase() + props.placeholder.slice(1);

    if (props.error !== undefined) {
      props.error.forEach((error) => {
        if (error.errorArea === uncapitalized) {
          return setInputError({ err: true, errorMsg: error.errorMsg });
        }
      });
    }
  }, [props.error, props.placeholder]);

  return (
    <div className="flex w-full h-16">
      {!inputError?.err ? (
        <input
          className="w-full h-full border-2 border-gray-500 px-[1rem]"
          placeholder={props.placeholder}
          type={type}
          name={props.placeholder}
        />
      ) : (
        <>
          <input
            className="w-[75%] h-full border-2 border-red-500 px-[1rem] border-r-0 outline-none"
            placeholder={props.placeholder}
            type={type}
            name={props.placeholder}
          />
          <div className="flex items-center w-[25%] h-full border-2 border-red-500 border-l-0">
            <p className="text-red-500 text-sm">{inputError.errorMsg}</p>
          </div>
        </>
      )}
    </div>
  );
};

// const AuthInput = ({ placeholder, error }) => {
//   const [inputError, setInputError] = useState({ err: false, errorMsg: null });

//   let type = "text";

//   if (placeholder === "Password") {
//     type = "password";
//   }

//   useEffect(() => {
//     setInputError({ err: false, errorMsg: null });

//     const uncapitalized =
//       placeholder.charAt(0).toLowerCase() + placeholder.slice(1);

//     if (error !== undefined) {
//       error.forEach((error) => {
//         if (error.errorArea === uncapitalized) {
//           return setInputError({ err: true, errorMsg: error.errorMsg });
//         }
//       });
//     }
//   }, [error, placeholder]);

//   return (
//     <div className="flex w-full h-16">
//       {!inputError.err ? (
//         <input
//           className="w-full h-full border-2 border-gray-500 px-[1rem]"
//           placeholder={placeholder}
//           type={type}
//           name={placeholder}
//         />
//       ) : (
//         <>
//           <input
//             className="w-[75%] h-full border-2 border-red-500 px-[1rem] border-r-0 outline-none"
//             placeholder={placeholder}
//             type={type}
//             name={placeholder}
//           />
//           <div className="flex items-center w-[25%] h-full border-2 border-red-500 border-l-0">
//             <p className="text-red-500 text-sm">{inputError.errorMsg}</p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

export default AuthInput;
