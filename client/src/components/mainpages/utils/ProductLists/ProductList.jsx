import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { GlobalState } from "../../../../GlobalState";

export default function ProductList({ product, isAdmin }) {
    const state = useContext(GlobalState);
    // // const [isAdmin] = state.userAPI.isAdmin;
    // const [products] = state.userAPI.products;
    const addCart = state.userAPI.addCart;
    console.log(product);
    return (
        <div className="product_card">
            {isAdmin && <input type="checkbox" checked={product.checked} />}
            <img src={product.productImages.url} alt="" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>
            <div className="row_btn">
                {isAdmin ? (
                    <>
                        <Link id="btn_buy" to={"#"}>
                            Delete
                        </Link>
                        <Link id="btn_view" to={`/detail/${product._id}`}>
                            Edit
                        </Link>
                    </>
                ) : (
                    <>
                        <Link id="btn_buy" to={"#"} 
                            onClick={() => addCart(product)}
                        >
                            Buy now
                        </Link>
                        <Link id="btn_view" to={`/detail/${product._id}`}>
                            View
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
