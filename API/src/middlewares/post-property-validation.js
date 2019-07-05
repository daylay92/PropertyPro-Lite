import { check, validationResult } from 'express-validator';
import { states, type, purpose, status } from '../utils/validation-data';
import { deleteImage } from '../utils/cloudinary';

export default class PostProperty {
  static validate() {
    return [
      check('status')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
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
        .matches(/^\d+(\.|\d)[0-9]$/)
        .withMessage('should be a float or numbers')
        .escape(),
      check('state')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
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
        .isIn([...type])
        .withMessage('should be one of the types listed'),
      check('otherType')
        .custom((value, { req }) => {
          if (!value) return req.body.type.trim() !== 'Others';
          return true;
        })
        .withMessage('should only be used when the selected type is Others')
        .custom((value, { req }) => {
          if (value) return req.body.type.trim() === 'Others';
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
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isIn([...purpose])
        .withMessage('should be one of the types listed')
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
      deleteImage(req.file.public_id);
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
