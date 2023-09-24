import express from 'express';
import { Usercontroller } from './user.controller';

const router = express.Router();

router.post('/signup', Usercontroller.createUser);
router.post('/signin', Usercontroller.loginUser);

export const UserRoutes = router