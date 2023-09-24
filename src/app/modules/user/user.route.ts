import express from 'express';
import { Usercontroller } from './user.controller';

const router = express.Router();

router.post('/signup', Usercontroller.createUser);
router.post('/signin', Usercontroller.loginUser);
router.get('/', Usercontroller.getAllUsers);
router.get('/:id', Usercontroller.findUserById);

export const UserRoutes = router