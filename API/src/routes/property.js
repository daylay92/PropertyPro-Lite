import { Router } from 'express';
import PropertyController from '../controllers/propertyController';
import ImageUpload from '../middlewares/image-upload';
import Authenticate from '../middlewares/authenticate';
import PostProperty from '../middlewares/post-property-validation';
import authorize from '../middlewares/authorize';
import PatchProperty from '../middlewares/patch-property-validation';
import PutProperty from '../middlewares/put-property-validation';

const router = Router();

router.get('/', Authenticate.verify, PropertyController.getAllProperties);
router.get('/:propertyId', Authenticate.verify, PropertyController.getProperty);
router.post(
  '/',
  Authenticate.verify,
  ImageUpload.multerUploader,
  PostProperty.validate(),
  PostProperty.verifyValidationResult,
  PropertyController.postProperty
);

router.patch(
  '/:propertyId',
  Authenticate.verify,
  authorize,
  PatchProperty.validate(),
  PatchProperty.verifyValidationResult,
  PropertyController.updatePrice
);
router.put(
  '/:propertyId',
  Authenticate.verify,
  authorize,
  ImageUpload.multerUpdateUpload,
  PutProperty.validate(),
  PutProperty.verifyValidationResult,
  PropertyController.updateProperty
);
router.patch(
  '/:propertyId/sold',
  Authenticate.verify,
  authorize,
  PropertyController.markProperty
);

router.delete(
  '/:propertyId',
  Authenticate.verify,
  authorize,
  PropertyController.deleteProperty
);
export default router;
