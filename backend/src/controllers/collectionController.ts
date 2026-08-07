import { Request, Response } from 'express';
import { CollectionRequestModel } from '../models/collectionRequest';

export async function createCollection(req: Request, res: Response) {
  const { userId, wasteType, estimatedQuantity, address, coordinates } = req.body;
  if (!userId || !wasteType) return res.status(400).json({ message: 'userId and wasteType required' });
  const doc = await CollectionRequestModel.create({ user: userId, wasteType, estimatedQuantity, address, coordinates });
  res.status(201).json(doc);
}

export async function listCollections(req: Request, res: Response) {
  const { role, userId } = req.query as any;
  if (role === 'ADMIN') {
    const docs = await CollectionRequestModel.find().populate('user').lean();
    return res.json(docs);
  }
  if (role === 'COLLECTOR') {
    const docs = await CollectionRequestModel.find({ collector: userId }).populate('user').lean();
    return res.json(docs);
  }
  const docs = await CollectionRequestModel.find({ user: userId }).lean();
  res.json(docs);
}

export async function updateStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status, collectorId } = req.body;
  const doc = await CollectionRequestModel.findById(id);
  if (!doc) return res.status(404).json({ message: 'Not found' });
  if (collectorId) doc.collector = collectorId;
  if (status) doc.status = status;
  await doc.save();
  res.json(doc);
}
