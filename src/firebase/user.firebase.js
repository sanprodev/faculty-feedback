import { firestore } from './config.firebase';

export const getUserByKey = (key) => {
  return new Promise( async (resolve, reject) => {
    try {
      const snapshot = await firestore.collection('users').doc(key).get();
      const user =  snapshot.data();
      resolve(user);
    }
    catch(error) {
      reject(error);
    }
  });
}
