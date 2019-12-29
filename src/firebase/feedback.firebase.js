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
export const getFeedbacksByFacultySubject = (faculty) => {
  return new Promise( async (resolve, reject) => {
    try {
      const snapshot = await firestore.collection('feedbacks').get();
      const feedbacks =  snapshot.docs.map(doc => doc.data());

      const facultyFeedback = feedbacks.filter(feedback => {
        return feedback.department === faculty.department && feedback.faculty === faculty.faculty;
      });

      const filtered = facultyFeedback.filter((feedback, index, self) =>
        index === self.findIndex((t) => (
          t.subject === feedback.subject
        ))
      )

      resolve(filtered);
    }
    catch(error) {
      reject(error);
    }
  });
}


// get feedbacks faculty
export const getFacultyFeedbackAverage = (subject) => {
  return new Promise( async (resolve, reject) => {
    try {
      const snapshot = await firestore.collection('feedbacks').get();
      const feedbacks =  snapshot.docs.map(doc => doc.data());
      const facultyFeedback = feedbacks.filter(feedback => {
        return feedback.subject === subject;
      });

      const averageRatings = facultyFeedback.reduce((previousValue, currentValue) => {
        return {
          subject: subject,
          comment: currentValue.comment,
          faculty: currentValue.faculty,
          department: currentValue.department,
          overallRating: parseInt(previousValue.overallRating) + parseInt(currentValue.overallRating),
          clarityAndEmphasis: parseInt(previousValue.clarityAndEmphasis) + parseInt(currentValue.clarityAndEmphasis),
          creatingIntrest: parseInt(previousValue.creatingIntrest) + parseInt(currentValue.creatingIntrest),
          disipline: parseInt(previousValue.disipline) + parseInt(currentValue.disipline),
          encouraging: parseInt(previousValue.encouraging) + parseInt(currentValue.encouraging),
          motivational: parseInt(previousValue.motivational) + parseInt(currentValue.motivational),
          passion: parseInt(previousValue.passion) + parseInt(currentValue.passion),
          promotingStudent: parseInt(previousValue.promotingStudent) + parseInt(currentValue.promotingStudent),
          punctuality: parseInt(previousValue.punctuality) + parseInt(currentValue.punctuality),
          qualityOfIllustrative: parseInt(previousValue.qualityOfIllustrative) + parseInt(currentValue.qualityOfIllustrative),
          subjectKnowledge: parseInt(previousValue.subjectKnowledge) + parseInt(currentValue.subjectKnowledge),
        }
      });

      resolve(averageRatings);
    }
    catch(error) {
      reject(error);
    }
  });
}
