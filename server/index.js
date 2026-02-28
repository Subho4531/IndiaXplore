import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import passRoutes from './routes/pass.js';
import profileRoutes from './routes/profile.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pass', passRoutes);
app.use('/api/profile', profileRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'IndiaXplore API is running on Render' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        // Vercel expects an exported app, not a running server

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    })
    .catch((error) => console.error('MongoDB connection error:', error));

export default app;
