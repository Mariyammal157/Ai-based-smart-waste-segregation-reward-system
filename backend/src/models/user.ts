import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  hashedPassword: string;
  role: 'USER' | 'COLLECTOR' | 'ADMIN';
  pointsBalance: number;
  address?: string;
  coordinates?: { lat: number; lng: number };
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  hashedPassword: { type: String, required: true },
  role: { type: String, enum: ['USER', 'COLLECTOR', 'ADMIN'], default: 'USER' },
  pointsBalance: { type: Number, default: 0 },
  address: { type: String },
  coordinates: { lat: Number, lng: Number }
}, { timestamps: true });

export const UserModel = model<IUser>('User', UserSchema);
