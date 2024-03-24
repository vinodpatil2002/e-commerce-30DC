import { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const refreshToken = async () => {
        try {
            const res = await fetch("/user/refresh_token", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            console.log("Refresh token response:", data);
            const accessToken = data;
            setToken(accessToken);
        } catch (error) {
            console.error("Error refreshing token:", error);
        }
    }           
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) refreshToken();
    }, []);



    // Initialize productAPI state with a component reference
    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(), // Pass the component itself without invoking it
        userAPI : UserAPI(token)
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
}
