import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentType: { type: String, required: true }, // e.g. 'Aadhar', 'Passport'
    documentHash: { type: String, required: true }, // Hashed version of the document content/ID for privacy
    uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Document', documentSchema);
