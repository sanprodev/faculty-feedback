import React from 'react';
// components
import AppButton from '../../components/AppButton/AppButton.Component';
import AppInputField from '../../components/AppForm/AppInputField/AppInputField.Component';
import AppSelectField from '../../components/AppForm/AppSelectField/AppSelectField.Component';
import AppRadioButtonGroup from '../../components/AppForm/AppRadioButtonGroup/AppRadioButtonGroup.Component';
// firebase helper
import { getFaculties } from '../../firebase/faculty.firebase';
import { getUserByKey } from '../../firebase/user.firebase';
import { addNewFeedback } from '../../firebase/feedback.firebase';

import { AuthContext } from '../auth/auth.page';

class HomePage extends React.Component {
  static contextType = AuthContext;

  state = {
    feedback: {
      department: '',
      faculty: '',
      subject: '',
      comment: '',
      passion: '',
      subjectKnowledge: '',
      clarityAndEmphasis: '',
      motivational: '',
      creatingIntrest: '',
      qualityOfIllustrative: '',
      punctuality: '',
      disipline: '',
      promotingStudent: '',
      encouraging: '',
      overallRating: '',
    },
    user: {},
    faculties: [],
    requestSuccess: false,
    requestFailure: false,
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { feedback, user } = this.state;

    const isFormValid = this.isFormValid();
    if(!isFormValid) return this.setState({ requestFailure: true });

    try {
      await addNewFeedback(feedback, user);
      this.setState(prevState => ({
        ...prevState,
        requestSuccess: true,
        feedback: {
          department: '',
          faculty: '',
          subject: '',
          comment: '',
          passion: '',
          subjectKnowledge: '',
          clarityAndEmphasis: '',
          motivational: '',
          creatingIntrest: '',
          qualityOfIllustrative: '',
          punctuality: '',
          disipline: '',
          promotingStudent: '',
          encouraging: '',
          overallRating: '',
        }
      }));
    }
    catch (error) {
      console.log('Error', error.message);
    }
  }

  handleOnChange = (event) => {
    const { value, name } = event.target;
    const feedback = {...this.state.feedback}
    feedback[name] = value;

    this.setState({ feedback });
  }

  isFormValid = () => {
    const {feedback} = this.state;

    if(
        !feedback.department ||
        !feedback.faculty ||
        !feedback.subject ||
        !feedback.comment ||
        !feedback.passion ||
        !feedback.subjectKnowledge ||
        !feedback.clarityAndEmphasis ||
        !feedback.motivational ||
        !feedback.creatingIntrest ||
        !feedback.qualityOfIllustrative ||
        !feedback.punctuality ||
        !feedback.disipline ||
        !feedback.promotingStudent ||
        !feedback.encouraging ||
        !feedback.overallRating
    ) {
      return false;
    }
    return true;
  }

  async componentDidMount() {
    try {
      const faculties = await getFaculties();
      const user = await getUserByKey(this.context.id);

      this.setState({ faculties, user });
    }
    catch(error) {
      console.log('Error', error.message);
    }
  }

  componentDidUpdate() {
    const { requestSuccess, requestFailure } = this.state;
    if(requestSuccess || requestFailure) {
      setTimeout(() => {
        this.setState({ requestSuccess: false, requestFailure: false });
      }, 3000);
    }
  }

  render() {
    const { feedback, faculties, requestSuccess, requestFailure } = this.state;
    const { department, faculty, subject, comment } = feedback;

    return (
      <div className="home-page page-container">
        <div className="page-title">
          <p>Provid Feedback</p>
        </div>
  
        { requestSuccess ? (
          <div className="success">
            Feedback Submit
          </div>
        ): null }

        { requestFailure ? (
          <div className="error">
            Please fill all fields
          </div>
        ): null }

        <form className="feedback-form" onSubmit={this.handleFormSubmit}>
          <AppSelectField
            type="text"
            name="department"
            placeholder="Department"
            options={["MCA"]}
            value={department}
            handleOnChange={this.handleOnChange}
          />
          <AppSelectField
            type="text"
            name="faculty"
            placeholder="Faculty"
            options={faculties.map(faculty => faculty.name)}
            value={faculty}
            handleOnChange={this.handleOnChange}
          />
          <AppInputField
            type="text"
            name="subject"
            placeholder="Subject"
            value={subject}
            handleOnChange={this.handleOnChange}
          />
          <AppInputField
            type="text"
            name="comment"
            placeholder="Comment"
            value={comment}
            handleOnChange={this.handleOnChange}
          />
          <AppRadioButtonGroup
            name="passion"
            placeholder="Passion and enthusiasm to teach"
            label="Passion and enthusiasm to teach"
            values={[1,2, 3, 4, 5]}
            handleOnChange={this.handleOnChange}
          />
          <AppRadioButtonGroup
            name="subjectKnowledge"
            placeholder="Subject Knowledge"
            label="Subject Knowledge"
            values={[1,2, 3, 4, 5]}
            handleOnChange={this.handleOnChange}
          />
          <AppRadioButtonGroup
            name="clarityAndEmphasis"
            placeholder="Clarity and emphasis on concept"
            label="Clarity and emphasis on concept"
            values={[1,2, 3, 4, 5]}
            handleOnChange={this.handleOnChange}
          />
          <AppRadioButtonGroup
            name="motivational"
            placeholder="Motivational and inspiring students"
            label="Motivational and inspiring students"
            values={[1,2, 3, 4, 5]}
            handleOnChange={this.handleOnChange}
          />
          <AppRadioButtonGroup
            name="creatingIntrest"
            placeholder="Creating interest in subject"
            label="Creating interest in subject"
            values={[1,2, 3, 4, 5]}
            handleOnChange={this.handleOnChange}
          />
          <AppRadioButtonGroup
            name="qualityOfIllustrative"
            placeholder="Quality illustrative examples and applications"
            label="Quality illustrative examples and applications"
            values={[1,2, 3, 4, 5]}
            handleOnChange={this.handleOnChange}
          />
          <AppRadioButtonGroup
            name="punctuality"
            placeholder="Punctuality and uniform coverage of syllabus"
            label="Punctuality and uniform coverage of syllabus"
            values={[1,2, 3, 4, 5]}
            handleOnChange={this.handleOnChange}
          />
          <AppRadioButtonGroup
            name="disipline"
            placeholder="Discipline and control in the class"
            label="Discipline and control in the class"
            values={[1,2, 3, 4, 5]}
            handleOnChange={this.handleOnChange}
          />
          <AppRadioButtonGroup
            name="promotingStudent"
            placeholder="Promoting student thinking"
            label="Promoting student thinking"
            values={[1,2, 3, 4, 5]}
            handleOnChange={this.handleOnChange}
          />
          <AppRadioButtonGroup
            name="encouraging"
            placeholder="Encouraging and student interaction"
            label="Encouraging and student interaction"
            values={[1,2, 3, 4, 5]}
            handleOnChange={this.handleOnChange}
          />
          <AppRadioButtonGroup
            block
            name="overallRating"
            placeholder="Overall Rating"
            label="Overall Rating"
            values={[
              { label: "Excellent", value: 1 },
              { label: "Very Good", value: 2 },
              { label: "Average", value: 3 },
              { label: "Satisfactory", value: 4 },
              { label: "Poor", value: 5 },
            ]}
            handleOnChange={this.handleOnChange}
          />

          <AppButton type="submit" value="Submit">
            { !requestSuccess ? "Submit" : "Processing....." }
          </AppButton>
        </form>
      </div>
    )
  }
}

export default HomePage;
