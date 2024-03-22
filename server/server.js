import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import productRouter from './routes/product.route.js';
import cookieParser from 'cookie-parser';
import uploadRouter from './routes/upload.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
}));
dotenv.config();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.use(fileUpload({
    useTempFiles:true
}))
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// connect mongoDB 

const URI = process.env.MONGO_URL;


mongoose.connect(URI).then(() => {
        console.log('MongoDB connected!');
    }
).catch(err => console.log(err));


// routes
app.use("/user", userRouter);
app.use("/api",categoryRouter);
app.use("/api",uploadRouter)
app.use("/api", productRouter);