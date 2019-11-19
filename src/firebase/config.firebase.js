import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// }

const config = {
  apiKey: "AIzaSyDyn-84dkkTf2tihyJWGzW7cn0CwQkeQTU",
  authDomain: "faculty-feedback-f10dc.firebaseapp.com",
  databaseURL: "https://faculty-feedback-f10dc.firebaseio.com",
  projectId: "faculty-feedback-f10dc",
  storageBucket: "faculty-feedback-f10dc.appspot.com",
  messagingSenderId: "637502235258",
  appId: "1:637502235258:web:a22cb7e97dce82238491c3"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
