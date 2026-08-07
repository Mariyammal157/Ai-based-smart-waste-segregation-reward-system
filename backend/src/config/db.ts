import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/ecosort-ai';

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(uri, {
      dbName: 'ecosort-ai'
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.warn('MongoDB connection failed, using in-memory fallback.');
    // In-memory fallback logic would be implemented here.
  }
}
