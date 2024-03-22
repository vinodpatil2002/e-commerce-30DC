// import React from 'react'

import { useContext } from "react"
import { GlobalState } from "../../../GlobalState"
import ProductList from "../utils/ProductLists/ProductList";
import './product.css'

export default function Product() {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  console.log(state);
  return (
    <div className="products">
      {
        products.map(product => {
          return <ProductList key={product._id} product={product} />
        }
        )
      }
    </div>
  )
}
