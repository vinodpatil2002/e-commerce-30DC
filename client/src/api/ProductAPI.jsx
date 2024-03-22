import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductAPI() {
    const [products, setProducts] = useState([]);
    
    const getProducts = async () => {
        try {
            const res = await fetch("/api/product");

            if (!res.ok) {
                throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            console.log(data.products);
            setProducts(data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    

    useEffect(() => {
        getProducts();
    }, []);

    return {
            products : [products, setProducts]
    };
}
