import { Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';

const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL ?? 'http://localhost:8000/predict';

export async function scanWaste(req: Request, res: Response) {
  if (!req.file && !req.body.imageUrl) {
    return res.status(400).json({
      message: 'Image is required.',
    });
  }

  try {
    // Image URL provided
    if (req.body.imageUrl) {
      const resp = await axios.post(AI_SERVICE_URL, {
        filename: req.body.imageUrl,
      });

      return res.json(resp.data);
    }

    // Uploaded image file
    if (req.file) {
      const form = new FormData();

      form.append('file', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });

      const resp = await axios.post(AI_SERVICE_URL, form, {
        headers: form.getHeaders(),
      });

      return res.json(resp.data);
    }
  } catch (error) {
    console.warn(
      'AI service unavailable, using fallback classifier'
    );

    // Fallback classifier
    const filename =
      req.body.imageUrl?.toLowerCase() ??
      req.file?.originalname?.toLowerCase() ??
      '';

    const result: {
      category: string;
      confidence: number;
      recommended_bin: string;
      points: number;
      disposal_instruction: string;
      environmental_message: string;
    } = {
      category: 'Organic',
      confidence: 0.7,
      recommended_bin: 'Compost',
      points: 5,
      disposal_instruction: 'Place in organic bin',
      environmental_message: 'Compostable item.',
    };

    if (filename.includes('plastic')) {
      result.category = 'Plastic';
      result.recommended_bin = 'Recycle';
      result.points = 15;
      result.disposal_instruction = 'Place in recycling bin';
      result.environmental_message =
        'Recycling plastic helps reduce waste.';
    }

    return res.json(result);
  }

  return res.status(500).json({
    message: 'Unable to process image.',
  });
}