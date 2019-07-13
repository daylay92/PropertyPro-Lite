import multer from 'multer';
import { storage, deleteImgWithReturn } from '../utils/cloudinary';
/* eslint camelcase: 0 */
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
      return next();
    });
  }

  static async multerUpdateUpload(req, res, next) {
    const multerUpload = multer({
      storage,
      limits: { files: 1, fileSize: 750000 }
    }).single('image');
    multerUpload(req, res, async err => {
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

      if (req.file) {
        const { imageId } = req.prop;
        const { result } = await deleteImgWithReturn(imageId);
        if (result !== 'ok' && result !== 'not found')
          return res.status(500).json({
            status: '500 Server Interval Error',
            error:
              'Something went wrong while processing your request, Do try again'
          });
        const { url, originalname, public_id } = req.file;
        req.prop.image_url = url;
        req.prop.imageId = public_id;
        req.prop.imageName = originalname;
      }
      return next();
    });
  }
}
