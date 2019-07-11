import { Router } from 'express';
import propertyController from '../controllers/propertyController';
import ImageUpload from '../middlewares/image-upload';
import Authenticate from '../middlewares/authenticate';
import PostProperty from '../middlewares/post-property-validation';
import authorize from '../middlewares/authorize';
import UpdateProperty from '../middlewares/update-property-validation';

const router = Router();

router.get('/', propertyController.getAllProperties);
router.get('/:propertyId', propertyController.getProperty);
router.post(
  '/',
  Authenticate.verify,
  ImageUpload.multerUploader,
  PostProperty.validate(),
  PostProperty.verifyValidationResult,
  propertyController.postProperty
);
router.patch(
  '/:propertyId',
  Authenticate.verify,
  authorize,
  ImageUpload.multerUpdateUpload,
  UpdateProperty.validate(),
  UpdateProperty.verifyValidationResult,
  propertyController.updateProperty
);

router.patch(
  '/:propertyId/sold',
  Authenticate.verify,
  authorize,
  propertyController.markProperty
);

router.delete(
  '/:propertyId',
  Authenticate.verify,
  authorize,
  propertyController.deleteProperty
);
export default router;
