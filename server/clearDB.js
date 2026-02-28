import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
    .then(async () => {
        console.log('Connected to MongoDB');
        await mongoose.connection.db.dropDatabase();
        console.log('Database dropped');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
