import { Router } from 'express';
import SignUp from '../middlewares/signup-validation';
import Auth from '../controllers/authController';

const router = Router();

// signup route
router.post(
  '/signup',
  SignUp.validate(),
  SignUp.verifyValidationResult,
  SignUp.isEmailAlreadyExist,
  Auth.signUp
);

export default router;
