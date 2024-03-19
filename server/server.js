import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// connect mongoDB 

const URI = process.env.MONGO_URL;
console.log(URI);

mongoose.connect(URI).then(() => {
        console.log('MongoDB connected!');
    }
).catch(err => console.log(err));
