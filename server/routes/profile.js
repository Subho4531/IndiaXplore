import express from 'express';
import User from '../models/User.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
// import { authenticateToken } from '../middleware/auth.js'; // To be added maybe later for security

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${req.params.userId}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) return cb(null, true);
        cb(new Error("Only images are allowed"));
    }
});

// Get User Profile
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching profile' });
    }
});

// Update Profile Picture
router.post('/:userId/upload', upload.single('profilePic'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Build the URL (Internal relative path)
        const profilePicUrl = `/uploads/${req.file.filename}`;
        user.profilePic = profilePicUrl;
        await user.save();

        res.json({ message: 'Upload successful', profilePic: profilePicUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Profile / Add Family Member
router.put('/:userId/family', async (req, res) => {
    try {
        const { name, age, relation, profilePic } = req.body;
        const user = await User.findById(req.params.userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        user.familyMembers.push({ name, age, relation, profilePic });
        await user.save();

        res.json(user.familyMembers);
    } catch (error) {
        res.status(500).json({ message: 'Server error updating family' });
    }
});

// Remove Family Member
router.delete('/:userId/family/:memberId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.familyMembers = user.familyMembers.filter(m => m._id.toString() !== req.params.memberId);
        await user.save();

        res.json({ familyMembers: user.familyMembers });
    } catch (error) {
        res.status(500).json({ message: 'Error removing family member' });
    }
});

// Update Family Member Profile Picture
router.post('/:userId/family/:memberId/upload', upload.single('profilePic'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const member = user.familyMembers.id(req.params.memberId);
        if (!member) return res.status(404).json({ message: 'Family member not found' });

        const profilePicUrl = `/uploads/${req.file.filename}`;
        member.profilePic = profilePicUrl;
        await user.save();

        res.json({ message: 'Upload successful', familyMembers: user.familyMembers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
