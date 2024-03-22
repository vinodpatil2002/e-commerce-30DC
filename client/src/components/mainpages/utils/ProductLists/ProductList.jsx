import React from 'react'
import { Link } from 'react-router-dom';
import './ProductList.css';

export default function ProductList({product}) {
    console.log(product);
  return (
    <div className='product_card'>
        <img src={product.productImages.url} alt="" />
        <div className="product_box">
            <h2 title={product.title}>{product.title}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>
        </div>
        <div className="row_btn">
            <Link id='btn_buy' to={'#'}>
                Buy now
            </Link>
            <Link id='btn_view' to={`/detail/${product._id}`}>
                View
            </Link>
        </div>
    </div>
  )
}
