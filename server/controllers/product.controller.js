import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req, res) => {
    try {
        const { product_id, title, price, description, content, category, productImages, checked, sold } = req.body;
        if(!productImages) return res.status(400).json({ message: 'No image upload' });
        const product = await Product.findOne({ product_id });
        if(product) return res.status(400).json({ message: 'This product already exists' });

        const newProduct = new Product({
            product_id,title: title.toLowerCase(), price, description, content, category, productImages, checked, sold
        });
        await newProduct.save();
        res.json({newProduct, message: 'Product created successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {title, price, description, content, category, productImages, checked, sold} = req.body;
        if(!productImages) return res.status(400).json({ message: 'No image upload' });

        const updatedProduct = await Product.findByIdAndUpdate(id, {title: title.toLowerCase(), price, description, content, category, productImages, checked, sold});
        res.json({updatedProduct, message: 'Product updated successfully' });
    }
    catch (error) {
        console.log(error);
    }
}