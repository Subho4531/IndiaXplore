import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from '../server/routes/auth.js';
import passRoutes from '../server/routes/pass.js';
import profileRoutes from '../server/routes/profile.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'IndiaXplore API is running (at /api/health)' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'IndiaXplore API is running (at /health)' });
});

// Root route for the API function
app.get('/api', (req, res) => {
    res.json({ message: 'IndiaXplore API Root' });
});

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/pass', passRoutes);
app.use('/api/profile', profileRoutes);

// Fallback for debugging
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.path}`,
        receivedPath: req.path,
        originalUrl: req.originalUrl,
        suggestion: 'Try /api/health or /api/auth/login'
    });
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
