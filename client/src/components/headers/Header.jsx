// import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import './header.css';

export default function Header() {
  return (
    <header>
        <div className="menu">
            <GiHamburgerMenu size={30}/>
        </div>

        <div className="logo">
            <h1>
                <Link to="/">MERN Shopping</Link>
            </h1>
        </div>

        <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/login">Login or Register</Link></li>
            <li>
                <CgClose size={30} className="menu"/>
            </li>
        </ul>
        <div className="cart-icon">
            <span className="cartlogo">0</span>
            <Link to="/cart">
                <GiShoppingCart size={30}/>
            </Link>
        </div>
    </header>
  )
}
