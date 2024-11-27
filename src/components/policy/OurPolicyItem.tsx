import React from "react";

const OurPolicyItem: React.FC<{
  title: string;
  description: string;
  image: string;
}> = (props) => {
  return (
    <div className="flex h-full w-[200px] grow">
      <div className="flex justify-center items-center h-full w-[200px] grow">
        <div className="grid grid-rows-[1fr,1fr,1fr] justify-center w-full h-3/5">
          <div className="flex justify-center h-3/5 w-full">
            <img className="h-full" src={props.image} alt={props.image} />
          </div>
          <div className="flex flex-col text-center">
            <p className="text-center text-sm font-bold">
              {props.title}
            </p>
            <p className="text-sm text-gray-400">
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPolicyItem;
