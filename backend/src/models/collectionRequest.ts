import { Schema, model, Document, Types } from 'mongoose';

export type CollectionStatus = 'PENDING' | 'ASSIGNED' | 'ACCEPTED' | 'PICKUP_IN_PROGRESS' | 'COLLECTED' | 'COMPLETED' | 'CANCELLED';

export interface ICollectionRequest extends Document {
  user: Types.ObjectId;
  collector?: Types.ObjectId;
  wasteType: string;
  estimatedQuantity?: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  status: CollectionStatus;
}

const CollectionRequestSchema = new Schema<ICollectionRequest>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  collector: { type: Schema.Types.ObjectId, ref: 'User' },
  wasteType: { type: String },
  estimatedQuantity: { type: String },
  address: { type: String },
  coordinates: { lat: Number, lng: Number },
  status: { type: String, enum: ['PENDING', 'ASSIGNED', 'ACCEPTED', 'PICKUP_IN_PROGRESS', 'COLLECTED', 'COMPLETED', 'CANCELLED'], default: 'PENDING' }
}, { timestamps: true });

export const CollectionRequestModel = model<ICollectionRequest>('CollectionRequest', CollectionRequestSchema);
