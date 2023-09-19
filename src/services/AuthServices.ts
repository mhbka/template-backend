import { getFirebaseAuth } from "./FirebaseSingleton";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
  UserCredential
 } from "firebase/auth";



// **** Variables **** //
const firebaseAuth = getFirebaseAuth();

// **** Functions **** //
/** Register a user through Firebase. */
async function register(email: string, password: string): Promise <UserCredential> {
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
}

/** Login a user through Firebase. */
async function login(email: string, password: string): Promise <UserCredential> {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
}

/** Logs out a user through Firebase. */
async function logout(): Promise <void> {
  signOut(firebaseAuth);
}

/** Sends a verification email. */
async function verifyUserEmail(){
  sendEmailVerification(firebaseAuth.currentUser!);
}

/** Send a password reset email. */
async function sendUserPasswordResetEmail(email: string){
  sendPasswordResetEmail(firebaseAuth, email);
}

/** Reset an account password with a reset code. */
async function resetPasswordWithCode(resetCode: string, newPassword: string){
  confirmPasswordReset(firebaseAuth, resetCode, newPassword);
}

// **** Export default **** //
export default {
  register, 
  login, 
  logout, 
  sendUserPasswordResetEmail, 
  resetPasswordWithCode, 
  verifyUserEmail
} as const;
