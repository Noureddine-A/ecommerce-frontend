import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  const { pathname, state } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div>{productId}</div>;
};

export default ProductDetail;
