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
  apiKey: "AIzaSyAytsN3HQTx3xtWGSesKZUZHhpukuEtkxg",
  authDomain: "facultyfeedback-e33c5.firebaseapp.com",
  databaseURL: "https://facultyfeedback-e33c5.firebaseio.com",
  projectId: "facultyfeedback-e33c5",
  storageBucket: "facultyfeedback-e33c5.appspot.com",
  messagingSenderId: "571665659391",
  appId: "1:571665659391:web:a1b509915b1e476492e3ca"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
