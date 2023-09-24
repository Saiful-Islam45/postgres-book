import express from 'express';
import { Usercontroller } from './user.controller';

const router = express.Router();

router.post('/signup', Usercontroller.createUser);
router.post('/signin', Usercontroller.loginUser);
router.get('/', Usercontroller.getAllUsers);

router
  .route('/:id')
  .get(Usercontroller.findUserById)
  .patch(Usercontroller.updateUser)
  .delete(Usercontroller.deleteUser);

export const UserRoutes = router;
