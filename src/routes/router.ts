import { Router } from 'express';
import Paths from '../constants/Paths';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';


// **** Main router **** //
const apiRouter = Router();


// **** Router for AuthRoutes **** //
const authRouter = Router();
// Register user
authRouter.post(Paths.Auth.Register, AuthRoutes.register);
// Login user
authRouter.post(Paths.Auth.Login, AuthRoutes.login);
// Logout user
authRouter.get(Paths.Auth.Logout, AuthRoutes.logout);


// **** Router for UserRoutes **** //
const userRouter = Router();
// Get user
userRouter.get(Paths.User.Info, UserRoutes.getUser);
// Update user info
userRouter.post(Paths.User.UpdateProfile, UserRoutes.updateProfile);
// Update user email
userRouter.get(Paths.User.UpdateEmail, UserRoutes.updateEmail)
// Update user password
userRouter.get(Paths.User.UpdatePassword, UserRoutes.updatePassword)
// Send password reset email
userRouter.get(Paths.User.ResetPassWithEmail, UserRoutes.sendPasswordResetEmail)


// **** Add all routers to main router **** //
apiRouter.use(Paths.Auth.Base, authRouter);
apiRouter.use(Paths.User.Base, userRouter);

// **** Export default **** //
export default apiRouter;
