import { check } from 'express-validator';
import { states, type, purpose, status } from '../utils/validation-data';
import PostProperty from './post-property-validation';

export default class UpdateProperty extends PostProperty {
  static validate() {
    return [
      check('status')
        .optional()
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isIn([...status])
        .withMessage('should be either Available, Sold or Rented')
        .custom((value, { req }) => {
          if (value === 'Rented')
            return (
              req.body.purpose === 'For Rent' || req.prop.purpose === 'For Rent'
            );
          return true;
        })
        .withMessage('status can only be rented if the purpose is For Rent')
        .custom((value, { req }) => {
          if (value === 'Sold')
            return (
              req.body.purpose === 'For Sale' || req.prop.purpose === 'For Sale'
            );
          return true;
        })
        .withMessage('status can only be Sold if the purpose is For Sale')
        .trim(),
      check('price')
        .optional()
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
        .optional()
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isIn([...states])
        .withMessage('should be one of the states listed')
        .trim(),
      check('city')
        .optional()
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
        .optional()
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isLength({ min: 5 })
        .withMessage('Should be atleast 3 characters long')
        .trim()
        .escape(),
      check('type')
        .optional()
        .not()
        .isEmpty()
        .withMessage('Field cannot be empty')
        .isIn([...type])
        .withMessage('should be one of the types listed')
        .custom((value, { req }) => {
          if (value.trim() === 'Others') return req.body.otherType;
          return true;
        })
        .withMessage(
          'the type selected requires that you fill the other-type field'
        )
        .custom((value, { req }) => {
          if (value.trim() !== 'Others') return !req.body.otherType;
          return true;
        })
        .withMessage(
          'the type selected implies you do not need to fill the other-type field'
        ),
      check('otherType')
        .optional()
        .custom((value, { req }) => {
          if (value)
            return req.body.type === 'Others' || req.prop.type === 'Others';
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
        .isIn([...purpose])
        .withMessage('should be one of the types listed')
    ];
  }
}