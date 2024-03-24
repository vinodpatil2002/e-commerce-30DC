// import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./header.css";
import { GlobalState } from "../../GlobalState";
import { useContext } from "react";
import axios from "axios";

export default function Header() {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;
    const adminRouter = () => {
        return (
            <>
                <li>
                    <Link to="/create_product">Create Product</Link>
                </li>
                <li>
                    <Link to="/category">Categories</Link>
                </li>
            </>
        );
    };

    const handleLogOut = async () => {
        await axios.get("/user/logout");
        localStorage.clear();
        setIsAdmin(false);
        setIsLogged(false);
    };

    const loggedRouter = () => {
        return (
            <>
                <li>
                    <Link to="/history">History</Link>
                </li>
                <li>
                    <Link to="/" onClick={handleLogOut}>
                        Logout
                    </Link>
                </li>
            </>
        );
    };

    return (
        <header>
            <div className="menu">
                <GiHamburgerMenu size={30} />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? "Admin" : "MERN Shopping"}</Link>
                </h1>
            </div>

            <ul>
                <li>
                    <Link to="/products">{isAdmin ? "Products" : "Shop"}</Link>
                </li>
                {isAdmin && adminRouter()}
                {isLogged ? (
                    loggedRouter()
                ) : (
                    <li>
                        <Link to="/login">Login or Register</Link>
                    </li>
                )}
                <li>
                    <CgClose size={30} className="menu" />
                </li>
            </ul>
            {isAdmin ? (
                ""
            ) : (
                <div className="cart-icon">
                    <span className="cartlogo">{cart.length}</span>
                    <Link to="/cart">
                        <GiShoppingCart size={30} />
                    </Link>
                </div>
            )}
        </header>
    );
}
