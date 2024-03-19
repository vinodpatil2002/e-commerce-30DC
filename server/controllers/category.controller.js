import { ReturnDocument } from "mongodb";
import Category from "../models/category.model.js";

export const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return res.status(400).json({ msg: "Category does not exist" });
        }
        res.json(categories);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findOne({ name });
        if (category) {
            return res.status(400).json({ msg: "This category already exists" });
        }
        const newCategory = new Category({ name });
        await newCategory.save();
        res.json({ msg: "Created a category" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ msg: "Deleted a category"});
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};  

export const updateCategory = async (req, res) => { 
    try {
        const { name } = req.body;
        await Category.findOneAndUpdate(
            { _id: req.params.id },
            { name }
        );
        res.json({ msg: "Updated a category" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};