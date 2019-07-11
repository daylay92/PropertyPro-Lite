import { check, validationResult } from 'express-validator';
import Helpers from '../utils/helpers';
import { states, type, purpose, status } from '../utils/validation-data';
import { deleteImage } from '../utils/cloudinary';

export default class PostProperty {
  static validate() {
    return [
      check('status')
        .optional()
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .customSanitizer(Helpers.capitalizeFirst)
        .isIn([...status])
        .withMessage('should be either Available, Sold or Rented')
        .trim(),
      check('price')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isLength({ min: 3, max: 15 })
        .withMessage('should be between 3-15 characters long')
        .trim()
        .matches(/^\d+(\.|\d)\d+$/)
        .withMessage('should be a float or numbers')
        .escape(),
      check('state')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .customSanitizer(Helpers.capitalizeFirst)
        .isIn([...states])
        .withMessage('should be one of the states listed')
        .trim(),
      check('city')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isAlpha()
        .withMessage('Should be Alphabets only')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Should be atleast 3 characters long')
        .escape(),
      check('address')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isLength({ min: 5 })
        .withMessage('Should be atleast 3 characters long')
        .trim()
        .escape(),
      check('type')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .customSanitizer(Helpers.capitalizeEachWord)
        .isIn([...type])
        .withMessage('should be one of the types listed')
        .custom((value, { req }) => {
          if (value.trim() === 'Others') return req.body.otherType;
          return true;
        })
        .withMessage(
          'the type selected requires that you fill the other-type field'
        ),
      check('otherType')
        .optional()
        .custom((value, { req }) => {
          if (value) return req.body.type === 'Others';
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
        .customSanitizer(Helpers.capitalizeEachWord)
        .isIn([...purpose])
        .withMessage('should either be For Sale or For Rent')
        .custom((value, { req }) => {
          const {
            body: { status: propertyStatus }
          } = req;
          if (value === 'For Sale')
            return (
              !status ||
              Helpers.capitalizeFirst(propertyStatus) === 'Available' ||
              Helpers.capitalizeFirst(propertyStatus) === 'Sold'
            );
          return true;
        })
        .withMessage(
          'should be selected only if status was set to Available or Sold'
        )
        .custom((value, { req }) => {
          const {
            body: { status: propertyStatus }
          } = req;
          if (value === 'For Rent')
            return (
              !status ||
              Helpers.capitalizeFirst(propertyStatus) === 'Available' ||
              Helpers.capitalizeFirst(propertyStatus) === 'Rented'
            );
          return true;
        })
        .withMessage(
          'should be selected only if status was set to Available or Rented'
        )
    ];
  }
  /* eslint no-param-reassign: 0 */

  static async verifyValidationResult(req, res, next) {
    const errors = validationResult(req);
    let isRequiredError = false;
    if (!errors.isEmpty()) {
      const validateErrors = errors.array();
      const errorObj = validateErrors.reduce((newErrObj, errObj) => {
        if (errObj.msg === 'Field is Required') isRequiredError = true;
        if (errObj.msg === 'Field cannot be empty') isRequiredError = true;
        newErrObj[errObj.param] = !newErrObj[errObj.param]
          ? errObj.msg
          : newErrObj[errObj.param];
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
