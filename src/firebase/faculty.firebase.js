import { firestore } from './config.firebase';

export const addNewFaculty = (data) => {
  return new Promise( async (resolve, reject) => {
    try {
      const newFaculty = await firestore.collection('faculties').add({...data});
      resolve(newFaculty);
    }
    catch(error) {
      reject(error);
    }
  });
}

// get faculties
export const getFaculties = () => {
  return new Promise( async (resolve, reject) => {
    try {
      const snapshot = await firestore.collection('faculties').get();
      const faculties =  snapshot.docs.map(doc => doc.data());
      resolve(faculties);
    }
    catch(error) {
      reject(error);
    }
  });
}
