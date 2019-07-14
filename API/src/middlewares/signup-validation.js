import { check, validationResult } from 'express-validator';
import UserServices from '../services/user';

export default class SignUp {
  static validate() {
    return [
      check(['first_name', 'last_name'])
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isAlpha()
        .withMessage('Should be Alphabets only')
        .isLength({ min: 3 })
        .withMessage('Should be atleast 3 characters long')
        .trim()
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
      check('email')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isEmail()
        .withMessage('Should be a valid Email Address'),
      check('confirm_password')
        .optional()
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .custom((value, { req }) => value === req.body.confirm_password)
        .withMessage('should match the Password field'),
      check('password')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isLength({ min: 6 })
        .withMessage('Should be atleast 6 characters Long')
        .trim()
        .escape(),
      check('phone_number')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isNumeric()
        .withMessage('Should be plain numbers without a country code or a + sign')
        .isLength({ max: 11, min: 9 })
        .withMessage('Should be atleast 9-11 characters')
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
      if (isRequiredError)
        return res.status(400).json({
          status: '400 Invalid Request',
          error: 'Some required fields are missing',
          errors: errorObj
        });
      return res.status(400).json({
        status: '400 Invalid Request',
        error: 'Your request contains invalid parameters',
        errors: errorObj
      });
    }

    return next();
  }

  static async isEmailAlreadyExist(req, res, next) {
    const { email } = req.body;
    const user = await UserServices.findByEmail(email);
    if (user)
      return res.status(409).json({
        status: '409 Conflict',
        error: 'A User with this email address already exists'
      });
    return next();
  }
}
