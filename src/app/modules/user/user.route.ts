import express from 'express';
import { Usercontroller } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/signup', Usercontroller.createUser);
router.post('/signin', Usercontroller.loginUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), Usercontroller.getAllUsers);

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.ADMIN), Usercontroller.findUserById)
  .patch(auth(ENUM_USER_ROLE.ADMIN), Usercontroller.updateUser)
  .delete(auth(ENUM_USER_ROLE.ADMIN), Usercontroller.deleteUser);

export const UserRoutes = router;
