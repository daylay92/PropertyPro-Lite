import multer from 'multer';
import { storage, deleteImgWithReturn } from '../utils/cloudinary';
import Helpers from '../utils/helpers';
/* eslint camelcase: 0 */
export default class ImageUpload {
  static multerUploader(req, res, next) {
    const multerUpload = multer({
      storage,
      limits: { files: 1, fileSize: 750000 }
    }).single('image_url');
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
      if (req.file) {
        req.body.image_url = req.file.url;
        req.body.image_id = req.file.public_id;
        req.body.image_name = req.file.originalname;
      }
      return next();
    });
  }

  static async multerUpdateUpload(req, res, next) {
    const multerUpload = multer({
      storage,
      limits: { files: 1, fileSize: 750000 }
    }).single('image_url');
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
        const { image_id } = req.prop;
        const { result } = await deleteImgWithReturn(image_id);
        if (result !== 'ok' && result !== 'not found')
          return Helpers.serverInternalError(res);
        const { url, originalname, public_id } = req.file;
        req.prop.image_url = url;
        req.prop.image_id = public_id;
        req.prop.image_name = originalname;
      }
      return next();
    });
  }
}
