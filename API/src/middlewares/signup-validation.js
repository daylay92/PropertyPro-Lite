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
        .normalizeEmail()
        .isEmail()
        .withMessage('Should be a valid Email Address'),
      check('gender')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isIn(['Male', 'Female'])
        .withMessage('Should be Male or Female')
        .trim()
        .escape(),
      check('confirm_password')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty'),
      check('password')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isLength({ min: 6 })
        .withMessage('Should be atleast 6 characters Long')
        .custom((value, { req }) => value === req.body.confirm_password)
        .withMessage('should match the confirm Password field')
        .trim()
        .escape(),
      check('phoneNumber')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isNumeric()
        .withMessage(
          'Should be plain numbers without a country code or a + sign'
        )
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
      const errorObj = validateErrors.reduce((newErrObj, errObj) => {
        if (errObj.msg === 'Field is Required') isRequiredError = true;
        if (errObj.msg === 'Field cannot be empty') isRequiredError = true;
        newErrObj[errObj.param] = !newErrObj[errObj.param]
          ? errObj.msg
          : newErrObj[errObj.param];
        return newErrObj;
      }, {});
      if (isRequiredError === true)
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
    const user = await UserServices.getUserByEmail(email);
    if (user)
      return res.status(409).json({
        status: '409 Conflict',
        error: 'A User with this email address already exists'
      });
    return next();
  }
}
