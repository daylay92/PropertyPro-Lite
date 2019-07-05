import { Router } from 'express';
import propertyController from '../controllers/propertyController';
import ImageUpload from '../middlewares/image-upload';
import Authenticate from '../middlewares/authenticate';
import PostProperty from '../middlewares/post-property-validation';

const router = Router();

router.post(
  '/',
  ImageUpload.multerUploader,
  Authenticate.verify,
  PostProperty.validate(),
  PostProperty.verifyValidationResult,
  propertyController.postProperty
);

export default router;
