import { createContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

export const ProductsContext = createContext({
  // initial products value is an empty array.
  products: [],
});

export const ProductsProvider = ({ children }) => {
  // this might have default values
  const [products, setProducts] = useState(PRODUCTS);

  // wrap the products value-which is an object-- inside another object and assign to value.
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
