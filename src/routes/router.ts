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
// Verify the email
authRouter.get(Paths.Auth.VerifyEmail, AuthRoutes.verifyEmail);
// Send password reset email to a specified email
authRouter.post(Paths.Auth.SendPasswordResetEmail, AuthRoutes.sendPasswordResetEmail)
// Reset password with a valid reset code
authRouter.post(Paths.Auth.ResetPassWithCode, AuthRoutes.resetPasswordWithCode)


// **** Router for UserRoutes **** //
const userRouter = Router();
// Get user
userRouter.get(Paths.User.Info, UserRoutes.getUser);
// Update user info
userRouter.post(Paths.User.UpdateProfile, UserRoutes.updateProfile);
// Update user email
userRouter.post(Paths.User.UpdateEmail, UserRoutes.updateEmail)
// Update user password
userRouter.post(Paths.User.UpdatePassword, UserRoutes.updatePassword)


// **** Add all routers to main router **** //
apiRouter.use(Paths.Auth.Base, authRouter);
apiRouter.use(Paths.User.Base, userRouter);

// **** Export default **** //
export default apiRouter;
