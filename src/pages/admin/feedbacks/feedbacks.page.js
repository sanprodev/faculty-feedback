import React from 'react';
import { Link } from 'react-router-dom';
// components
import AppButton from '../../../components/AppButton/AppButton.Component';
// firebase helper
import { getFeedbacksByFaculty } from '../../../firebase/feedback.firebase';

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

  handleOnClickBack = () => {
    this.setState({
      showDetails: false,
      feedbackDetails: {}
    });
  }

  handleOnClickViewDetails = (details) => {
    this.setState({
      showDetails: true,
      feedbackDetails: details,
    })
  }

  async componentDidMount() {
    const { faculty } = this.props.location.state;

    try {
      const feedbacks = await getFeedbacksByFaculty(faculty);
      console.log('feedbacks', feedbacks);
      
      this.setState({
        feedbacks: feedbacks,
      });
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
                  <p>Student ID</p>
                  { feedback.user.studentId }
                </div>
                <div className="ratings">
                  <p>Overall Rating</p>
                  { feedback.overallRating }
                </div>

                <div className="details">
                  <AppButton
                    type="button"
                    handleOnClick={() => this.handleOnClickViewDetails(feedback)}
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
            <p>
              Comment:
              <span>{feedbackDetails.comment}</span>
            </p>
            <p>
              Passion and enthusiasm to teach:
              <span>{feedbackDetails.passion}</span>
            </p>
            <p>
              Subject Knowledge:
              <span>{feedbackDetails.subjectKnowledge}</span>
            </p>
            <p>
              Clarity and emphasis on concept:
              <span>{feedbackDetails.clarityAndEmphasis}</span>
            </p>
            <p>
              Motivational and inspiring students:
              <span>{feedbackDetails.motivational}</span>
            </p>
            <p>
              Creating interest in subject:
              <span>{feedbackDetails.creatingIntrest}</span>
            </p>
            <p>
              Quality illustrative examples and applications:
              <span>{feedbackDetails.qualityOfIllustrative}</span>
            </p>
            <p>
              Punctuality and uniform coverage of syllabus:
              <span>{feedbackDetails.punctuality}</span>
            </p>
            <p>
              Discipline and control in the class:
              <span>{feedbackDetails.disipline}</span>
            </p>
            <p>
              Promoting student thinking:
              <span>{feedbackDetails.promotingStudent}</span>
            </p>
            <p>
              Encouraging and student interaction:
              <span>{feedbackDetails.encouraging}</span>
            </p>
            <p className="overall-rating">
              {feedbackDetails.overallRating}
            </p>
          </div>
        )}
      </div>
    )
  }
}

export default FeedbacksPage;
