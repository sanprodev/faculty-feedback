import { firestore } from './config.firebase';

export const addNewFeedback = (data, user) => {
  return new Promise( async (resolve, reject) => {
    try {
      const newFeedback = await firestore.collection('feedbacks').add({...data, user});
      resolve(newFeedback);
    }
    catch(error) {
      reject(error);
    }
  });
}

// get all feedbacks
export const getFeedbacks = () => {
  return new Promise( async (resolve, reject) => {
    try {
      const snapshot = await firestore.collection('feedbacks')
        .get();
      const feedbacks =  snapshot.docs.map(doc => doc.data());
      resolve(feedbacks);
    }
    catch(error) {
      reject(error);
    }
  });
}

// get feedbacks faculty
export const getFeedbacksByFaculty = (faculty) => {
  return new Promise( async (resolve, reject) => {
    try {
      const snapshot = await firestore.collection('feedbacks').get();
      const feedbacks =  snapshot.docs.map(doc => doc.data());
      const facultyFeedback = feedbacks.filter(feedback => {
        return feedback.department === faculty.department && feedback.faculty === faculty.faculty;
      });

      resolve(facultyFeedback);
    }
    catch(error) {
      reject(error);
    }
  });
}
