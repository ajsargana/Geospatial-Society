import { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';

// Extend Express Request type to include file property
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export const uploadMiddleware = upload.single('file');

export async function handleImageUpload(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    // Convert image to base64 for storage (works on Railway without filesystem)
    const base64Image = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    // Return the data URL that can be used directly in img src
    res.json({
      url: dataUrl,
      filename: req.file.originalname,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: mimeType
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}