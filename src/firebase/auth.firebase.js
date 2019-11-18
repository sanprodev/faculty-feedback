import { auth, firestore } from './config.firebase';

// register user with email and password
export const register = ({email, password, ...additionalData}) => {
  return new Promise( async (resolve, reject) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      const userRef = firestore.doc(`/users/${user.uid}`);
      const snapshot = await userRef.get();

      if(!snapshot.exist) {
        const createdAt = new Date();

        const newUser = await userRef.set({
          email,
          createdAt,
          ...additionalData
        });

        return resolve(newUser);
      }

      return resolve(userRef);
    }
    catch(error) {
      reject(error);
    }
  });
}

// login user with email and password
export const login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      return resolve(user);
    }
    catch (error) {
      reject(error);
    }
  });
}

// logou user
export const logout = () => auth.signOut();
