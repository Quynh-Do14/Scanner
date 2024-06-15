// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import {getFunctions} from 'firebase/functions';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCkjvI8grhAqX-IIevMqEUwVY6kFeIqBmk',
  authDomain: 'documentscanner-4977f.firebaseapp.com',
  projectId: 'documentscanner-4977f',
  storageBucket: 'documentscanner-4977f.appspot.com',
  messagingSenderId: '979166997106',
  appId: '1:979166997106:android:93799315aa009c1e9fb0eb',
  // measurementId: 'G-Y5J843MBP9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
export const storage = getStorage(app);
export const functions = getFunctions(app);
