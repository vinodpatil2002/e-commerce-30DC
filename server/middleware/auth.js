import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const isAuthenticated = async (req, res,next) => {
    try {
        const token = req.header("Authorization");
        // res.json(token);
        if (!token) return res.status(400).json({ msg: "Invalid Authentications" });
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication" });
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
