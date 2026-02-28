import express from 'express';
import Pass from '../models/Pass.js';
import User from '../models/User.js';

const router = express.Router();

// Middleware to simple extract user ID from headers for now (or a real auth middleware)
// For simplicity in this implementation, we can expect userId in the body or query 
// since auth using standard JWT bearer token might need a separate middleware.
// Given the existing auth.js returns a token but there's no auth middleware created yet,
// we will just take `userId` from the request body for POSTs, 
// OR we can create a basic token parsing if required. 
// Assuming the frontend will send the User ID in the payload for now to keep things simple or we'll assume it's sent.

// POST /api/pass/generate
router.post('/generate', async (req, res) => {
    try {
        const { userId, passType, uids, vehicle } = req.body;

        const user = await User.findById(userId);
        if (!user || user.role !== 'traveller') {
            return res.status(403).json({ message: 'Only travellers can generate a pass' });
        }

        const newPass = await Pass.create({
            user: userId,
            passType,
            uids,
            vehicle
        });

        res.status(201).json(newPass);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error generating pass' });
    }
});

// GET /api/pass/:id
router.get('/:id', async (req, res) => {
    try {
        const pass = await Pass.findById(req.params.id)
            .populate('user', 'name email')
            .populate('checkpoints.verifier', 'name email');

        if (!pass) {
            return res.status(404).json({ message: 'Pass not found' });
        }

        res.json(pass);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching pass' });
    }
});

// POST /api/pass/:id/verify
router.post('/:id/verify', async (req, res) => {
    try {
        const { verifierId, location, notes } = req.body;

        const verifier = await User.findById(verifierId);
        if (!verifier || verifier.role !== 'verifier') {
            return res.status(403).json({ message: 'Only verifiers can append checkpoints' });
        }

        const pass = await Pass.findById(req.params.id);
        if (!pass) {
            return res.status(404).json({ message: 'Pass not found' });
        }

        pass.checkpoints.push({
            verifier: verifierId,
            location,
            notes
        });

        await pass.save();

        // Return updated pass
        const updatedPass = await Pass.findById(req.params.id)
            .populate('user', 'name email')
            .populate('checkpoints.verifier', 'name email');

        res.json(updatedPass);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error recording checkpoint' });
    }
});

export default router;
