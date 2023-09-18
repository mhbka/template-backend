import { Request, Response } from 'express';
import UserServices from '../services/UserServices';
import HttpStatusCodes from '../constants/HttpStatusCodes';


// **** Functions **** //
// Get the current user.
async function getUser(req: Request, res: Response) {
    let user = await UserServices.getUser();
    if (!user) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({error: 'You are not logged in.'}).end();
    }
    else {
        return res.status(HttpStatusCodes.OK).json(user).end();
    }
}


// Update the current user's displayName and/or photoURL.
async function updateProfile(req: Request, res: Response) {
    let displayName: string = '', photoURL: string = '';
    if (req.body.photoURL) photoURL = req.body.photoURL; //firebase will do URL validation
    if (req.body.displayName) {
        if (req.body.displayName.trim() !== '' && !/\s/.test(req.body.displayName)) { //ensure displayName has no whitespaces
            displayName = req.body.displayName;
        }
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


// **** Export default **** //
export default {
    getUser, updateProfile,
} as const;