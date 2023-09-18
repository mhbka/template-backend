import { Response } from 'express';
import HttpStatusCodes from '../constants/HttpStatusCodes';


/** Takes a Firebase error code and response object, and appends appropriate response code + message. */
export function assignError(errorCode: string, res: Response){
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