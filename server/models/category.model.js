import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    _id: { type: String , default: new mongoose.Types.ObjectId()},
    name: { type: String, required: true,trim: true,unique: true},
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;