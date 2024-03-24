import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

export default function Cart() {

  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;

  if(cart.length === 0) return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2>


  return (
    <div>
      {
        cart.map(product => (<div key={product.product_id} className='details'>
        <img src={product.productImages.url} alt={product.title} />
        <div className='box_detail'>
            <div className='row'>
                <h2>{product.title}</h2>
                <h6>#id: {product.product_id}</h6>
            </div>
            <span>${product.price}</span>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <p>Sold: {product.sold}</p>
            <Link to='/cart' className='cart'>
                Buy Now
            </Link>
        </div>
    </div>
        ))
      }
    </div>
  )
}
