import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "Email Already Registered" });
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password is at least 6 characters" });
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: passwordHash
        });

        await newUser.save();

        const accessToken = createAccessToken({ id: newUser._id });
        const refreshToken = createRefreshToken({ id: newUser._id });

        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            path: '/user/refresh_token'
        });

        res.json({ accessToken });

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const rfToken = req.cookies.refreshtoken;

        if (!rfToken) {
            return res.status(400).json({ msg: "Please Login or Register" });
        }

        jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({ msg: "Please Login or Register" });
            }
            const accessToken = createAccessToken({ id: user.id });
            res.json({ user,accessToken });
        });

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Password" });
        }
        const accessToken = createAccessToken({ id: user._id });
        const refreshToken = createRefreshToken({ id: user._id });

        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            path: '/user/refresh_token'
        });

        res.json({accessToken});

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};