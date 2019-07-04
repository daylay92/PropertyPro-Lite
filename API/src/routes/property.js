import { Router } from 'express';
import propertyController from '../controllers/propertyController';
import ImageUpload from '../middlewares/image-upload';
import Authenticate from '../middlewares/authenticate';

const router = Router();

router.post(
  '/',
  Authenticate.verify,
  ImageUpload.multerUploader,
  propertyController.postProperty
);

export default router;
