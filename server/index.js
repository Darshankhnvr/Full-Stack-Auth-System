import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from "./routes/authRoute.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send(`Hello World`);
});

app.use('/api/auth', authRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})