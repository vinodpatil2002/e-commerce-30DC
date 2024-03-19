import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    cart: {
        type: Array,
        default: []
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);