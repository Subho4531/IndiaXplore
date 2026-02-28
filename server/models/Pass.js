import mongoose from 'mongoose';

const checkpointSchema = new mongoose.Schema({
    verifier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    notes: { type: String, default: '' },
    timestamp: { type: Date, default: Date.now }
});

const passSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The traveler who created it
    passType: { type: String, enum: ['indian', 'foreign'], required: true },
    uids: [{ type: String, required: true }], // Masked or hashed identifiers
    vehicle: { type: String, default: '' }, // Optional vehicle number
    checkpoints: [checkpointSchema] // History of verifier scans
}, { timestamps: true });

export default mongoose.model('Pass', passSchema);
