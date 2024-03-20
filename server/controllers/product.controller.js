import Product from '../models/product.model.js';

// filter, sorting and paginating
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete(queryObj[el]));
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sorting() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

export const getProducts = async (req, res) => {
    try {
        const features = new APIfeatures(Product.find(), req.query);
        features.filtering().sorting().paginating(); // Call filtering method
        const products = await features.query;
        res.json({results:products.length});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
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