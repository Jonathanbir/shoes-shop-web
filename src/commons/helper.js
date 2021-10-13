import React from "react";

const formatPrice = (price) => {
  price = parseInt(price / 30);
  return price;
};
export default formatPrice;
