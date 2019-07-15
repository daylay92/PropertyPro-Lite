import { check } from 'express-validator';
import PostProperty from './post-property-validation';

export default class PutProperty extends PostProperty {
  static validate() {
    return [
      check('price')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isLength({ min: 3, max: 15 })
        .withMessage('should be between 3-15 characters long')
        .trim()
        .matches(/^\d+(\.|\d)\d\d$/)
        .withMessage('should be a float or numbers e.g 5000.00 or 5000')
        .escape()
    ];
  }
}
