import { Router } from 'express';
import SignUp from '../middlewares/signup-validation';
import SignIn from '../middlewares/signin-validation';
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
router.post(
  '/signin',
  SignIn.validate(),
  SignIn.verifyValidationResult,
  Auth.signIn
);
export default router;
