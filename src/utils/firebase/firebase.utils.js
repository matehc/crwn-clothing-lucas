import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpQcpW55RWuKhHbo3b6E6kbsyDrFQhBmk",

  authDomain: "crwn-clothing-db-ece0f.firebaseapp.com",

  projectId: "crwn-clothing-db-ece0f",

  storageBucket: "crwn-clothing-db-ece0f.appspot.com",

  messagingSenderId: "517639897810",

  appId: "1:517639897810:web:36d6876c9b86b8677ca30b",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// This will point to our database inside firestore
export const db = getFirestore();

// take in user authentication response from google and pass it in to create or retrieve collection
export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  // this will retrieve the 'users' document reference;
  const userDocRef = doc(db, "users", userAuth.uid);

  // use the document reference to actually retrieve the data
  const userSnapshot = await getDoc(userDocRef);

  // check if document reference exists
  // if it doesn't, create document.
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// this signs out a user by using the auth
export const signOutUser = async () => await signOut(auth);

// the onAuthStateChanged listener actively listens for any change in the state of our auth,
// if auth changes fire the callback
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
