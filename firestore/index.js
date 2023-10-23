import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const db = firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const users = firestore.collection('users');

export default function getUsers() {
  // get all users
  users.get().then((response) => {
    console.log('one user');
    // for each user
    const list = [];
    // return an object with the id and the data for that user
    response.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    console.log(list);
    return list;
  }).catch((error) => {
    // if something went wrong, console log error
    console.log('wrong');
  });
}
