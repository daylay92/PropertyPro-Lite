import { config } from 'dotenv';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// configure cloud storage
const storage = cloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  format: 'png',
  folder: 'samples/test',
  transformation: [
    { if: 'w_lt_370_or_h_lt_295' },
    { effect: 'sharpen', width: 300, height: 295, crop: 'scale' },
    { if: 'else' },
    { effect: 'sharpen' },
    { if: 'end' }
  ]
});

export default storage;
