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
