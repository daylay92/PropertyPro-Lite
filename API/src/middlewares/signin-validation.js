import { check, validationResult } from 'express-validator';

export default class SignIn {
  static validate() {
    return [
      check('email')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isEmail()
        .withMessage('Invalid Email Address'),
      check('password')
        .exists()
        .withMessage('Field is Required')
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isLength({ min: 6 })
        .withMessage('Invalid Password')
        .trim()
        .escape()
    ];
  }

  static async verifyValidationResult(req, res, next) {
    const errors = validationResult(req);
    let isRequiredError = false;
    if (!errors.isEmpty()) {
      const validateErrors = errors.array();
      validateErrors.forEach(err => {
        if (err.msg === 'Field cannot be empty') isRequiredError = true;
      });
      if (isRequiredError)
        return res.status(401).json({
          status: '401 Unauthorized',
          error: 'Email or Password field should not be empty'
        });
      return res.status(401).json({
        status: '401 Unauthorized',
        error: 'Invalid login credentials'
      });
    }

    return next();
  }
}
