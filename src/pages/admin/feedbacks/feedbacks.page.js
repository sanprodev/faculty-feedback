import React from 'react';
import { Link } from 'react-router-dom';

import { getFeedbacksByFaculty } from '../../../firebase/feedback.firebase';

import './feedback.styles.scss';

class FeedbacksPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      faculty: '',
      feedbacks: []
    }
  }

  async componentDidMount() {
    const { faculty } = this.props.location.state;

    try {
      const feedbacks = await getFeedbacksByFaculty(faculty);
      this.setState({
        faculty: faculty.faculty,
        feedbacks: feedbacks,
      });
    } 
    catch (error) {
      console.log('Error', error.message);
    }
  }

  render() {
    const { faculty, feedbacks } = this.state;
    console.log('feedbacks', feedbacks);

    return (
      <div className="feedbacks-page page-container">
        <div className="page-title">
          <Link to="/admin">Back</Link>
          Fedbacks of {faculty}
        </div>

        {
          feedbacks.map((feedback, index) => {
            return (
              <div key={`${feedback.faculty}-${index}`}>
                <div className="name">{ feedback.faculty }</div>
                <div className="department">{ feedback.department }</div>
                <div className="name">{ feedback.overallRating }</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default FeedbacksPage;
