import { getFirebaseAuth } from "./FirebaseSingleton";
import { updateProfile, onAuthStateChanged, User } from "firebase/auth";
import { Request, Response } from "express";


// **** Variables **** //
const firebaseAuth = getFirebaseAuth();


// **** Functions **** //
/** Get the current user. */
async function getUser() {
    return new Promise<User | null>((resolve) => {
      onAuthStateChanged(firebaseAuth, (user) => {
        resolve(user);
      });
    });
}


/** Updates a user's displayName and/or photoURL. */
async function updateUserProfile(displayName?: string, photoURL?: string){
    updateProfile(firebaseAuth.currentUser!, {displayName, photoURL});
}


// **** Export default **** //
export default {
    getUser, updateUserProfile
} as const;