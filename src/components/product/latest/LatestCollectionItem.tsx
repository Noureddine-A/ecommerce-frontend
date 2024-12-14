import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/Product";
import { base64ToImage } from "../../util/util.ts";

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
    const b64String = base64ToImage(props.image);

    setImage(b64String);
  }, [props.image]);

  function onItemClickHandler() {
    navigate("/product/" + props.id, { state: props.product });
  }

  return (
    <div
      className="grid grid-rows-[8fr,1fr,1fr] w-[300px] h-[45vh] mr-auto hover:cursor-pointer mb-[1rem] max-lg:w-[240px] max-[375px]:w-[150px] max-[414px]:w-[170px] max-[430px]:w-[195px]"
      onClick={onItemClickHandler}
    >
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
