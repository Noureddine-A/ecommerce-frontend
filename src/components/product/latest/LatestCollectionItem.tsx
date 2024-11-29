import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/Product";

const LatestCollectionItem: React.FC<{
  id: number;
  image: string;
  name: string;
  price: number;
  product: Product;
}> = (props) => {
  const [image, setImage] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    let b64String = "";
    if (props.image.startsWith("iVB")) {
      b64String = "data:image/png;base64," + props.image;
    } else if (props.image.startsWith("/9j")) {
      b64String = "data:image/jpg;base64," + props.image;
    }

    setImage(b64String);
  }, []);

  function onItemClickHandler() {
    navigate("/product/" + props.id, { state: props.product });
  }

  return (
    <div
      className="grid grid-rows-[8fr,2fr,1fr] w-[165px] h-[45vh] mr-auto hover:cursor-pointer mb-[1rem]"
      onClick={onItemClickHandler}
    >
      <div className="w-full overflow-hidden">
        <img
          className="h-full w-full hover:transform hover:scale-110 transition ease-in-out"
          src={image}
          alt={image}
        />
      </div>
      <div className="flex w-full">
        <p className="text-[12px]">{props.name}</p>
      </div>
      <div className="w-full">
        <p className="text-[12px]">${props.price}</p>
      </div>
    </div>
  );
};

export default LatestCollectionItem;
