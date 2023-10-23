/* eslint-disable consistent-return */
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/storage';

import 'firebase/compat/storage';
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
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const clothes = firestore.collection('clothes');
export const users = firestore.collection('users');
export const review = firestore.collection('review');
const receiverID = 'iyiLkWigQpX3S8CPuBJk';
const review1 = 'lSTHbusy31ODB4oan8rI';
// const starImage = storage.ref('./assets/star1.png');
export const storage = firebase.storage();

// returns all items in the clothes collection

export const getItems = async () => {
  try {
    const data = await clothes.get();
    const list = [];

    data.forEach((item) => {
      list.push({ id: item.id, data: item.data() });
    });
    // console.log(list);
    return list;
  } catch (error) {
    console.log(error); // this will run when the Promise rejects
    return 'error';
  }
};
export const messages = firestore.collection('messages');

export const addItem = (newTitle, newprice, newsize, newdescription, newtags, newfilename) => {
  clothes.add({
    title: newTitle,
    price: newprice,
    size: newsize,
    description: newdescription,
    tags: newtags,
    likes: 0,
    offers: 0,
    username: 'maymoree.t',
    filename: newfilename,
  }).then(
    console.log('successfully added!'),
  ).catch((error) => {
    console.log('failed to add item');
  });
};

export const addMessage = (newId, newCreatedAt, newText, newUserTo, newUserFrom) => {
  messages.add({
    createdAt: newCreatedAt,
    text: newText,
    user: newUserTo,
    userFrom: newUserFrom,
  }).then(
    console.log('successfully added!'),
  ).catch((error) => {
    console.log('failed to add item');
  });
};

export const addMessageWithQuickReply = (newId, newCreatedAt, newText, newUserTo, newUserFrom, newQuickReplies) => {
  messages.add({
    createdAt: newCreatedAt,
    text: newText,
    user: newUserTo,
    userFrom: newUserFrom,
    quickReplies: newQuickReplies,

  }).then(
    console.log('successfully added!'),
  ).catch((error) => {
    console.log('failed to add item');
  });
};

export const getMessages = async (userFromID, userToID) => {
  try {
    const data = await messages.get();
    const list = [];

    // const q = query(data, where('user', '!=', 'nothing'));
    // console.log(q);
    data.forEach((doc) => {
      if ((doc.data().userFrom === userFromID && String(doc.data().user._id) === userToID) || (doc.data().userFrom === userToID && String(doc.data().user._id) === userFromID)) {
        const obj = doc.data();
        if (obj.quickReplies == null) {
          list.push({
            _id: obj.createdAt.toDate(),
            createdAt: obj.createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          });
        } else {
          console.log('found quick reply');
          list.push({
            _id: obj.createdAt.toDate(),
            createdAt: obj.createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
            quickReplies: doc.data().quickReplies,
          });
        }
      }
    });
    console.log(list);
    return list;
  } catch (error) {
    console.log(error); // this will run when the Promise rejects
    return 'hi';
  }
};

export const getUser = async () => {
  try {
    const data = await users.get();
    const list = [];

    data.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    // console.log(list);
    return list;
  } catch (error) {
    console.log(error); // this will run when the Promise rejects
    return 'hi';
  }
};

export const getUserUsername = async () => {
  try {
    const response = await users.doc(receiverID).get();
    const person = ({ id: response.id, data: response.data() });
    console.log(person.data.username);
    return person.data;
  } catch (error) {
    return 'hi';
  }
};

export const updateInfo = async (nnewName, nnewEmail, nnewUser, nnewPassword) => {
  try {
    console.log('hi');
    const response = await users.doc(receiverID).update({
      name: nnewName,
      email: nnewEmail,
      username: nnewUser,
      bio: nnewPassword,
    });
    console.log(response.nnewEmail);
    console.log(response.email);
    return response;
  } catch (error) {
    return 'hi';
  }
};

export const getAverageRating = async () => {
  try {
    const response = await review.doc(review1).get();
    const person = ({ id: response.id, data: response.data() });
    // console.log(person.data.stars);
    console.log('test_1');
    return person.data.stars;
  } catch (error) {
    return 'error';
  }
};

// export const fillINstARS = async () => {
//   try {
//     const response = await review.doc(review1).get();
//     const person = ({ id: response.id, data: response.data() });
//     // const storage = firebase.storage(); globally declared!
//     // console.log(person.data.stars);
//     // console.log('test_1');
//     let overallRating = 0;
//     let count = 0;
//     // const stars = 0;
//     // console.log('test_2');
//     review.forEach((doc) => {
//       if (doc.data().receiver === receiverID) {
//         // console.log('test_2.5');
//         const { starRating } = doc.data();
//         overallRating += starRating;
//         count++;
//         // console.log('test_3');
//       }
//     });
//     const averageRating = overallRating / count;
//     // console.log('Average Star Rating:', averageRating);
//     stars = averageRating;
//     // console.log('test_4');

//     // console.log('test_6');
//     return 'hi';
//   } catch (error) {
//     return 'hi';
//   }
// };
// get one users' likes
// const getUserLikes = () => {
//   query.get()
//     .then((querySnapshot) => {
//       const likes = [];

//       querySnapshot.forEach((doc) => {
//         const docData = doc.data();
//         if (docData.likes) {
//           likes.push(...docData.likes);
//         }
//       });
//       console.log('Likes', { likes });
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// };
