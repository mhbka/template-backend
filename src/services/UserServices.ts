import { getFirebaseAuth } from "./FirebaseSingleton";
import { 
  updateProfile, 
  updateEmail, 
  updatePassword, 
  sendPasswordResetEmail, 
  sendEmailVerification, 
  confirmPasswordReset,
  onAuthStateChanged, 
  User } from "firebase/auth";
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

/** Updates a user's email. */
async function updateUserEmail(email: string){
  updateEmail(firebaseAuth.currentUser!, email);
}

/** Updates a user's password. */
async function updateUserPassword(password: string){
  updatePassword(firebaseAuth.currentUser!, password);
}


// **** Export default **** //
export default {
    getUser, 
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
} as const;