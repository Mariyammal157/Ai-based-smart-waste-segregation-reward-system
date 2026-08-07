import { Schema, model, Document, Types } from 'mongoose';

export interface ICollectorProfile extends Document {
  collector: Types.ObjectId;
  vehicleNumber?: string;
  currentStatus?: 'active' | 'idle';
  currentCoordinates?: { lat: number; lng: number };
}

const CollectorProfileSchema = new Schema<ICollectorProfile>({
  collector: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  vehicleNumber: { type: String },
  currentStatus: { type: String, enum: ['active', 'idle'], default: 'idle' },
  currentCoordinates: { lat: Number, lng: Number }
}, { timestamps: true });

export const CollectorProfileModel = model<ICollectorProfile>('CollectorProfile', CollectorProfileSchema);
