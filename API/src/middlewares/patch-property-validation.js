import { check } from 'express-validator';
import PostProperty from './post-property-validation';

export default class PatchProperty extends PostProperty {
  static validate() {
    return [
      check('price')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .trim()
        .isNumeric()
        .withMessage('should be a float or numbers e.g 5000.00 or 5000')
        .escape()
    ];
  }
}
