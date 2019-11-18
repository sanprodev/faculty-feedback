import firebase from './config.firebase';

export const getUserByKey = (key) => {
  return new Promise( async (resolve, reject) => {
    try {
      var userRef = await firebase.database().ref(`users`);
      console.log('userRef', userRef);
      await userRef.on('value', function(snapshot) {
        console.log('snapshot', snapshot.val());
      });
    }
    catch(error) {
      reject(error);
    }
  });
}
