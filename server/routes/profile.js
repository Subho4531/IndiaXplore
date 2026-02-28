import express from 'express';
import User from '../models/User.js';
// import { authenticateToken } from '../middleware/auth.js'; // To be added maybe later for security

const router = express.Router();

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

        res.json(user.familyMembers);
    } catch (error) {
        res.status(500).json({ message: 'Error removing family member' });
    }
});

export default router;
