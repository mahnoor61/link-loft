import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASURMENT_ID,
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({ prompt: 'select_account' });
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

const extractDisplayNameAndPhoto = (result) => {
  const user = result?.user || {};
  const info = result?.additionalUserInfo || {};
  const profile = info?.profile || {};

  let displayName = user.displayName || null;
  if (!displayName) {
    const first = profile.firstName || profile.given_name || profile?.name?.firstName;
    const last = profile.lastName || profile.family_name || profile?.name?.lastName;
    if (first || last) {
      displayName = [first, last].filter(Boolean).join(' ').trim() || null;
    } else if (typeof profile.name === 'string') {
      displayName = profile.name;
    }
  }

  const photoURL = user.photoURL || null; // default to null if provider gives none

  const providerId = info?.providerId || user?.providerData?.[0]?.providerId || null;
  return { displayName, photoURL, providerId };
};

const saveUserProfileIfNew = async (result) => {
  const user = result?.user;
  if (!user) return result;
  const userRef = doc(db, 'users', user.uid);
  const isNewUser = !!result?.additionalUserInfo?.isNewUser;

  try {
    const { displayName, photoURL, providerId } = extractDisplayNameAndPhoto(result);

    // Always ensure the user document exists and update timestamps
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email || null,
      providerId: providerId || null,
      // Only set displayName/photoURL if provided by provider; otherwise keep as-is/null
      ...(displayName ? { displayName } : {}),
      ...(photoURL ? { photoURL } : {}),
      ...(isNewUser ? { createdAt: serverTimestamp() } : {}),
      lastLoginAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Failed to write user profile to Firestore', error);
    // Do not block sign-in if profile write fails
  }

  return result;
};

const mapAuthErrorMessage = (error) => {
  const code = error?.code || '';
  switch (code) {
    case 'auth/operation-not-allowed':
      return 'This sign-in method is disabled. Enable the provider in Firebase Auth.';
    case 'auth/unauthorized-domain':
      return 'Unauthorized domain for OAuth. Add your domain in Firebase Auth settings.';
    case 'auth/popup-blocked':
      return 'Popup was blocked by the browser. Allow popups and try again.';
    case 'auth/popup-closed-by-user':
      return 'Popup closed before completing sign-in.';
    case 'auth/cancelled-popup-request':
      return 'Another popup request is active. Please try again.';
    default:
      return error?.message || 'Authentication failed. Please try again.';
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await saveUserProfileIfNew(result);
    return result;
  } catch (err) {
    console.error('Google sign-in error', err);
    throw new Error(mapAuthErrorMessage(err));
  }
};

export const signInWithFacebook = async () => {
  try {
    return await signInWithPopup(auth, facebookProvider);
  } catch (err) {
    console.error('Facebook sign-in error', err);
    throw err;
  }
};

export const signInWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    await saveUserProfileIfNew(result);
    return result;
  } catch (err) {
    console.error('Apple sign-in error', err);
    throw new Error(mapAuthErrorMessage(err));
  }
};

// import { initializeApp , getApps } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId:process.env.NEXT_PUBLIC_MEASURMENT_ID,
// };
// // Initialize Firebase if no app is initialized
// let app;
// if (!getApps().length) {
//   app = initializeApp(firebaseConfig);
// } else {
//   app = getApps()[0];
// }
//
// // Initialize Firebase Auth
// export const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
//
// // Initialize Analytics only on the client side
// let analytics;
// if (typeof window !== 'undefined') {
//   analytics = getAnalytics(app);
// }
//
// export const signInWithGoogle = async () => {
//   try {
//     return await signInWithPopup(auth, provider);
//   } catch (err) {
//     console.error('Error connecting to Google', err);
//   }
// };
// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// //
// // // export const auth = getAuth(app);
// // const auth = getAnalytics(app);
// // const analytics = getAnalytics(app);
// // const provider = new GoogleAuthProvider();
// //
// // export const signInWithGoogle = async () => {
// //   try {
// //     return await signInWithPopup(auth, provider);
// //   } catch (err) {
// //     console.error('error connecting google', err);
// //   }
// // };
// //
