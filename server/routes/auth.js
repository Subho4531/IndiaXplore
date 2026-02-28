import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Document from '../models/Document.js';

const router = express.Router();

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register
router.post('/register', async (req, res) => {
    try {
        console.log("Register Request Body:", req.body);
        const { name, email, password, role, aadharNumber } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Hash Aadhar (we store the hash, not the real Aadhar number for privacy)
        const aadharHash = await bcrypt.hash(aadharNumber, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            aadharHash,
        });

        if (user) {
            // Create Document Record
            await Document.create({
                user: user._id,
                documentType: 'Aadhar',
                documentHash: aadharHash,
            });

            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password, aadharNumber, role } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const isAadharMatch = await bcrypt.compare(aadharNumber, user.aadharHash);
        if (!isAadharMatch) {
            return res.status(401).json({ message: 'Aadhar verification failed' });
        }

        // Also verify if the role matches they attempt to login with
        if (user.role !== role && role) {
            return res.status(401).json({ message: `Unauthorized: You do not have the ${role} role` });
        }

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Verify Aadhar Endpoint (For testing/verification)
router.post('/verify-aadhar', async (req, res) => {
    try {
        const { aadharNumber, userId } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(aadharNumber, user.aadharHash);
        if (isMatch) {
            res.json({ verified: true, message: 'Aadhar Verified successfully' });
        } else {
            res.status(400).json({ verified: false, message: 'Aadhar does not match' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verifying Aadhar' });
    }
});

export default router;
