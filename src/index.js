// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDpOusvvyfre1mYg7hJ4DPQfypD_vKIcXU',
  authDomain: 'dartpop-firebase.firebaseapp.com',
  projectId: 'dartpop-firebase',
  storageBucket: 'dartpop-firebase.appspot.com',
  messagingSenderId: '788222645068',
  appId: '1:788222645068:web:208144bd6a4d4fa3c4f5e9',
  measurementId: 'G-SK69KHEQC0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
