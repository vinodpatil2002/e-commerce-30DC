import { createContext, useState } from "react";
import ProductAPI from "./api/ProductAPI";

export const GlobalState = createContext();

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false);

    // Initialize productAPI state with a component reference
    const state = {
        token: [token, setToken],
        productAPI: ProductAPI() // Pass the component itself without invoking it
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
}
