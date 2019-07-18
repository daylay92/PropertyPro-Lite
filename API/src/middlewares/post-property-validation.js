import { check, validationResult } from 'express-validator';
import Helpers from '../utils/helpers';
import { purpose, status } from '../utils/validation-data';
import { deleteImage } from '../utils/cloudinary';

export default class PostProperty {
  static validate() {
    return [
      check('status')
        .optional()
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .customSanitizer(Helpers.toSmallLetters)
        .isIn([...status])
        .withMessage('should be either available, sold or rented')
        .trim(),
      check('price')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .trim()
        .isNumeric()
        .withMessage('should be a float or a number e.g 5000.00 or 5000')
        .escape(),
      check('state')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .customSanitizer(Helpers.capitalize)
        .trim(),
      check('city')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .trim()
        .escape(),
      check('address')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .trim()
        .escape(),
      check('type')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .customSanitizer(Helpers.toSmallLetters)
        .custom((value, { req }) => {
          if (value.trim() === 'others') return req.body.other_type;
          return true;
        })
        .withMessage('the type selected requires that you fill the other-type field')
        .trim()
        .escape(),
      check('other_type')
        .optional()
        .custom((value, { req }) => {
          if (value) return req.body.type.toLowerCase() === 'others';
          return true;
        })
        .withMessage('should only be used when the selected type is Others')
        .custom(value => {
          if (value) return value.trim().length > 3 && value.trim().length < 13;
          return true;
        })
        .withMessage('Should be between 3-12 characters long')
        .trim()
        .escape(),
      check('purpose')
        .optional()
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .customSanitizer(Helpers.toSmallLetters)
        .isIn([...purpose])
        .withMessage('should either be For Sale or For Rent')
        .custom((value, { req }) => {
          const {
            body: { status: propertyStatus }
          } = req;
          if (value === 'for sale')
            return (
              !status ||
              propertyStatus.toLowerCase() === 'available' ||
              propertyStatus.toLowerCase() === 'sold'
            );
          return true;
        })
        .withMessage('should be selected only if status was set to Available or Sold')
        .custom((value, { req }) => {
          const {
            body: { status: propertyStatus }
          } = req;
          if (value === 'for rent')
            return (
              !status ||
              propertyStatus.toLowerCase() === 'available' ||
              propertyStatus.toLowerCase() === 'rented'
            );
          return true;
        })
        .withMessage('should be selected only if status was set to Available or Rented')
        .trim()
        .escape(),
      check('image_url')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty'),
      check('description')
        .optional()
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
    ];
  }
  /* eslint no-param-reassign: 0 */

  static async verifyValidationResult(req, res, next) {
    const errors = validationResult(req);
    let isRequiredError = false;
    if (!errors.isEmpty()) {
      const validateErrors = errors.array();
      const errorObj = validateErrors.reduce((newErrObj, { msg, param }) => {
        if (msg === 'Field is Required' || msg === 'Field cannot be empty')
          isRequiredError = true;
        if (newErrObj[param]) newErrObj[param].push(msg);
        else newErrObj[param] = [msg];
        return newErrObj;
      }, {});
      if (req.file) deleteImage(req.file.public_id);
      if (isRequiredError)
        return res.status(400).json({
          status: '400 Bad Request',
          error: 'Some required fields are missing',
          errors: errorObj
        });
      return res.status(400).json({
        status: '400 Bad Request',
        error: 'Your request contains invalid parameters',
        errors: errorObj
      });
    }
    return next();
  }
}
