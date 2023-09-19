import HttpStatusCodes from '../constants/HttpStatusCodes';
import AuthServices from '../services/AuthServices';
import { Request, Response } from 'express';
import { assignError } from '../errors/firebaseErrorHandling';


// **** Functions **** //
/** Login a user. */
async function login(req: Request, res: Response) {
    let email: string, password: string;
    try{
        email = req.body.email;
        password = req.body.password;
    }
    catch (error) { //req body is malformed
        return res.status(HttpStatusCodes.BAD_REQUEST)
        .json({error: "Missing email and/or password."})
        .end();
    }
    
    await AuthServices.login(email, password)
    .then(() => {return res.status(HttpStatusCodes.OK).end();})
    .catch((error) => {return assignError(error.code, res);})
}


/** Register a user. */
async function register(req: Request, res: Response) {
    let email: string, password: string;
    try{
        email = req.body.email;
        password = req.body.password;
    }
    catch (error) { //req body is malformed
        return res.status(HttpStatusCodes.BAD_REQUEST)
        .json({error: "Missing email and/or password."})
        .end();
    }
    
    await AuthServices.register(email, password)
    .then(() => {return res.status(HttpStatusCodes.OK).end();})
    .catch((error) => {return assignError(error.code, res);})
}


/** Logout the user. */
async function logout(_: Request, res: Response) {
    await AuthServices.logout()
    .then(() => {return res.status(HttpStatusCodes.OK).end();})
    .catch((error) => {return assignError(error.code, res);})
}


/** Verify the user's email. */
async function verifyEmail(req: Request, res: Response) {
    await AuthServices.verifyUserEmail()
    .then(() => {
        return res.status(HttpStatusCodes.OK).end();
    })
    .catch((error) => {
        return assignError(error.code, res);
    })
}


/** Send a password reset email. */
async function sendPasswordResetEmail(req: Request, res: Response) {
    if (!req.body.email){
        return res.status(HttpStatusCodes.BAD_REQUEST).json({error: 'No email provided.'}).end();
    }
    await AuthServices.sendUserPasswordResetEmail(req.body.email)
    .then(() => {
        return res.status(HttpStatusCodes.OK).end();
    })
    .catch((error) => {
        return assignError(error.code, res);
    })
}


/** Reset an account password with a reset code. */
async function resetPasswordWithCode(req: Request, res: Response) {
    let resetCode: string = '', newPassword: string = '';
    try {
        [resetCode, newPassword] = req.body;
    }
    catch {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({error: 'Missing resetCode and/or newPassword.'}).end();
    }

    await AuthServices.resetPasswordWithCode(resetCode, newPassword)
    .then(() => {
        return res.status(HttpStatusCodes.OK).end();
    })
    .catch((error) => {
        return assignError(error.code, res);
    })
}


// **** Export default **** //
export default {
    login,
    register,
    logout,
    verifyEmail,
    sendPasswordResetEmail,
    resetPasswordWithCode
} as const;
