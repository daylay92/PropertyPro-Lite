import multer from 'multer';
import storage from '../utils/cloudinary';

export default class ImageUpload {
  static multerUploader(req, res, next) {
    const multerUpload = multer({
      storage,
      limits: { files: 1, fileSize: 750000 }
    }).single('image');
    multerUpload(req, res, err => {
      if (err instanceof multer.MulterError)
        return res.status(400).json({
          status: '400 Bad Request',
          error: 'Image should not exceed 750kb'
        });

      if (err)
        return res.status(400).json({
          status: '400 Bad Request',
          error: 'Invalid File Format'
        });
      const { url, originalname } = req.file;
      req.imageContent = { url, originalname };
      return next();
    });
  }
}
