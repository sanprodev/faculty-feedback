import React from 'react';
import { Link } from 'react-router-dom';
// components
import AppButton from '../../../components/AppButton/AppButton.Component';
// firebase helper
import { getFeedbacksByFacultySubject, getFacultyFeedbackAverage } from '../../../firebase/feedback.firebase';

import './feedback.styles.scss';

class FeedbacksPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      faculty: '',
      feedbacks: [],
      feedbackDetails: {},
      showDetails: false,
    }
  }

  async componentDidMount() {
    const { faculty } = this.props.location.state;

    try {
      const feedbacks = await getFeedbacksByFacultySubject(faculty);
      console.log('feedbacks', feedbacks);
      
      this.setState({
        feedbacks: feedbacks,
      });
    } 
    catch (error) {
      console.log('Error', error.message);
    }
  }

  handleOnClickBack = () => {
    this.setState({
      showDetails: false,
      feedbackDetails: {}
    });
  }

  handleOnClickViewDetails = async (subject) => {
    try {
      const details = await getFacultyFeedbackAverage(subject);
      console.log('details', details);

      this.setState({
        showDetails: true,
        feedbackDetails: details,
      })
    } 
    catch (error) {
      console.log('Error', error.message);
    }
  }

  render() {
    const { faculty } = this.props.location.state;
    const { feedbacks, showDetails, feedbackDetails } = this.state;

    return (
      <div className="feedbacks-page page-container">
        <div className="page-title">
          {!showDetails ? (
            <Link to="/admin" className="back">Back</Link>
          ) : (
            <div className="back" onClick={this.handleOnClickBack}>Back</div>
          )}
          Fedbacks of {faculty.faculty}
        </div>

        { feedbacks.length === 0 ? (
          <div className="no-feedbacks">No Feedbacks</div>
        ) : null }

        { !showDetails ? (
          feedbacks.map((feedback, index) => {
            return (
              <div key={`${feedback.faculty}-${index}`} className="feedback">
                <div className="name">
                  <p>Subject</p>
                  { feedback.subject }
                </div>
                {/* <div className="ratings">
                  <p>Overall Rating</p>
                  { feedback.overallRating }
                </div> */}

                <div className="details">
                  <AppButton
                    type="button"
                    handleOnClick={() => this.handleOnClickViewDetails(feedback.subject)}
                  >
                    View Details
                  </AppButton>
                </div>
              </div>
            )
          })
        ) : (
          <div className="feedback-details">
            {/* <p>
              Student ID:
              <span>{feedbackDetails.user.studentId}</span>
            </p> */}
            <p>
              Department:
              <span>{feedbackDetails.department}</span>
            </p>
            <p>
              Subject:
              <span>{feedbackDetails.subject}</span>
            </p>
            {/* <p>
              Comment:
              <span>{feedbackDetails.comment}</span>
            </p> */}
            <p>
              Passion and enthusiasm to teach:
              <span>{parseInt(feedbackDetails.passion)/5}</span>
            </p>
            <p>
              Subject Knowledge:
              <span>{parseInt(feedbackDetails.subjectKnowledge)/5}</span>
            </p>
            <p>
              Clarity and emphasis on concept:
              <span>{parseInt(feedbackDetails.clarityAndEmphasis)/5}</span>
            </p>
            <p>
              Motivational and inspiring students:
              <span>{parseInt(feedbackDetails.motivational)/5}</span>
            </p>
            <p>
              Creating interest in subject:
              <span>{parseInt(feedbackDetails.creatingIntrest)/5}</span>
            </p>
            <p>
              Quality illustrative examples and applications:
              <span>{parseInt(feedbackDetails.qualityOfIllustrative)/5}</span>
            </p>
            <p>
              Punctuality and uniform coverage of syllabus:
              <span>{parseInt(feedbackDetails.punctuality)/5}</span>
            </p>
            <p>
              Discipline and control in the class:
              <span>{parseInt(feedbackDetails.disipline)/5}</span>
            </p>
            <p>
              Promoting student thinking:
              <span>{parseInt(feedbackDetails.promotingStudent)/5}</span>
            </p>
            <p>
              Encouraging and student interaction:
              <span>{parseInt(feedbackDetails.encouraging)/5}</span>
            </p>
            <p className="overall-rating">
              Overall Rating: {parseInt(feedbackDetails.overallRating)/5}
            </p>
          </div>
        )}
      </div>
    )
  }
}

export default FeedbacksPage;
