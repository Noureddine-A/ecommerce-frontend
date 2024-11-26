import React, { useEffect, useState } from "react";

const LatestCollectionItem: React.FC<{
  image: string;
  name: string;
  price: number;
}> = (props) => {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    let b64String = "";
    if (props.image.startsWith("iVB")) {
      b64String = "data:image/png;base64," + props.image;
    } else if (props.image.startsWith("/9j")) {
      b64String = "data:image/jpg;base64," + props.image;
    }

    setImage(b64String);
  }, []);

  return (
    <div className="grid grid-rows-[8fr,1fr,1fr] w-[160px] h-[20rem] mr-auto hover:cursor-pointer">
      <div className="w-full overflow-hidden">
        <img
          className="h-full w-full hover:transform hover:scale-110 transition ease-in-out"
          src={image}
          alt={image}
        />
      </div>
      <div className="flex items-center w-full">
        <p className="text-[12px]">{props.name}</p>
      </div>
      <div className="w-full">
        <p className="text-[12px]">${props.price}</p>
      </div>
    </div>
  );
};

export default LatestCollectionItem;
