import { Router } from 'express';
import propertyController from '../controllers/propertyController';
import ImageUpload from '../middlewares/image-upload';
import Authenticate from '../middlewares/authenticate';
import PostProperty from '../middlewares/post-property-validation';
import authorize from '../middlewares/authorize';

const router = Router();

router.post(
  '/',
  Authenticate.verify,
  ImageUpload.multerUploader,
  PostProperty.validate(),
  PostProperty.verifyValidationResult,
  propertyController.postProperty
);
router.patch(
  '/:id',
  Authenticate.verify,
  authorize,
  ImageUpload.multerUpdateUpload,
  propertyController.updateProperty
);

export default router;
