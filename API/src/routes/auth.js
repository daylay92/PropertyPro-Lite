import { Router } from 'express';
import Auth from '../controllers/authController';

const router = Router();

// signup route
router.post('/signup', Auth.signUp);

export default router;
