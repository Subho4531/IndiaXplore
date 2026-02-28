import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from '../server/routes/auth.js';
import passRoutes from '../server/routes/pass.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pass', passRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'IndiaXplore API is running' });
});

// Database connection
let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

// Middleware to ensure DB connection for every request in serverless
app.use(async (req, res, next) => {
    await connectToDatabase();
    next();
});

export default app;
