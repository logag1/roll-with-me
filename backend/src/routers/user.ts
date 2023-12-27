import { Router } from 'express';
import { UserController } from '../controllers';
import { asyncHandler, getFrontPath } from '../utilities';

const router = Router();

router
  .route('/detail')
  .get(asyncHandler(UserController.getDetail))

/**
 * @GET 롤페 제목과 perm 리턴
 * @POST 롤페 달아주기
 */
router
  .route('/gift')
  .post(asyncHandler(UserController.gift))
  .get(asyncHandler(UserController.getPapers))


export = router;