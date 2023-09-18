import HttpStatusCodes from '../constants/HttpStatusCodes';
import AuthServices from '../services/AuthServices';
import { Request, Response } from 'express';


// **** Error handler **** //
function assignError(errorCode: string, res: Response){
    switch(errorCode){
        case 'auth/invalid-email':
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({error: "Email is invalid."}).end();
        case 'auth/email-already-in-use':
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({error: "Email is already in use."}).end();
        case 'auth/invalid-login-credentials':
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({error: "Invalid credentials; please check your email/password."}).end();
        case 'auth/missing-password':
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({error: "Password is missing."}).end();
        case 'auth/missing-email':
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({error: "Email is missing."}).end();
        default:
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errorCode}).end();
    }
}


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


// **** Export default **** //
export default {
  login,
  register,
  logout,
} as const;
