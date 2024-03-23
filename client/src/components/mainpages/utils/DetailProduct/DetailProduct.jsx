import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import './detailproduct.css'

export default function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    if(detailProduct.length === 0) return null;



    console.log(detailProduct)
  return (
    <div className='details'>
        <img src={detailProduct.productImages.url} alt={detailProduct.title} />
        <div className='box_detail'>
            <div className='row'>
                <h2>{detailProduct.title}</h2>
                <h6>#id: {detailProduct.product_id}</h6>
            </div>
            <span>${detailProduct.price}</span>
            <p>{detailProduct.description}</p>
            <p>{detailProduct.content}</p>
            <p>Sold: {detailProduct.sold}</p>
            <Link to='/cart' className='cart'>
                Buy Now
            </Link>
        </div>
    </div>
  )
}
