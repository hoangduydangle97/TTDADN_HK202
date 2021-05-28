import { Router } from 'express';
import { currentUserRouter } from './current-user';
import { signinRouter } from './signin';
import { signupRouter } from './signup';

const userRoute = Router();

userRoute.use('/users', currentUserRouter, signupRouter, signinRouter);

export default userRoute;
