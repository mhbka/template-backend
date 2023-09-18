import { Request, Response } from 'express';
import UserServices from '../services/UserServices';
import { assignError } from '../errors/firebaseErrorHandling';
import HttpStatusCodes from '../constants/HttpStatusCodes';


// **** Functions **** //
/** Get the current user. */ 
async function getUser(req: Request, res: Response) {
    let user = await UserServices.getUser();
    if (!user) return res.status(HttpStatusCodes.UNAUTHORIZED).json({error: 'You are not logged in.'}).end();
    else return res.status(HttpStatusCodes.OK).json(user).end();
}


/** Update the current user's displayName and/or photoURL. */
async function updateProfile(req: Request, res: Response) {
    let displayName: string = '', photoURL: string = '';

    if (req.body.photoURL) photoURL = req.body.photoURL; 
    if (req.body.displayName) { 
        if (req.body.displayName.trim() !== '' && !/\s/.test(req.body.displayName)) displayName = req.body.displayName; //ensure displayName has no whitespaces
        else return res.status(HttpStatusCodes.BAD_REQUEST).json({error: 'Display name must not have whitespaces.'}).end();
    } 
    
    await UserServices.updateUserProfile(displayName, photoURL)
    .then(() => {
        return res.status(HttpStatusCodes.OK).end();
    })
    .catch((error) => {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: error.code}).end();
    })
}


/** Update the user's email. */
async function updateEmail(req: Request, res: Response) {
    if (!req.body.email) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({error: 'No email provided.'}).end();
    }

    await UserServices.updateEmail(req.body.email)
    .then(() => {
        return res.status(HttpStatusCodes.OK).end();
    })
    .catch((error) => {
        return assignError(error.code, res);
    })
}


/** Verify the user's email. */
async function verifyEmail(req: Request, res: Response) {
    await UserServices.verifyEmail()
    .then(() => {
        return res.status(HttpStatusCodes.OK).end();
    })
    .catch((error) => {
        return assignError(error.code, res);
    })
}


/** Update the user's password. */
async function updatePassword(req: Request, res: Response) {
    if (!req.body.password) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({error: 'No email provided.'}).end();
    }

    await UserServices.updateEmail(req.body.password)
    .then(() => {
        return res.status(HttpStatusCodes.OK).end();
    })
    .catch((error) => {
        return assignError(error.code, res);
    })
}


/** Send a password reset email. */
async function sendPasswordResetEmail(req: Request, res: Response) {
    await UserServices.sendPasswordResetEmail()
    .then(() => {
        return res.status(HttpStatusCodes.OK).end();
    })
    .catch((error) => {
        return assignError(error.code, res);
    })
}


// **** Export default **** //
export default {
    getUser, updateProfile, updateEmail, verifyEmail, updatePassword, sendPasswordResetEmail
} as const;