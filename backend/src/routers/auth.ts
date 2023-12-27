import { Router } from 'express';
import { asyncHandler } from '../utilities';
import { AuthController } from '../controllers';
import { getFrontPath } from '../utilities';

const router = Router();

router
  .route('/login')
  .post(asyncHandler(AuthController.login))

router
  .route('/register')
  .post(asyncHandler(AuthController.register))

export = router;