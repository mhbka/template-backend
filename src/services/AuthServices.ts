import { getFirebaseAuth } from "./FirebaseSingleton";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";



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


// **** Export default **** //
export default {
  register, login, logout
} as const;
