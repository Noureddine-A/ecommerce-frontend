import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  const {state} = useLocation();

  console.log(state);
  
  return <div>{productId}</div>;
};

export default ProductDetail;
