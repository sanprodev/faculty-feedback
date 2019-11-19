import React from 'react';

import AppButton from '../../components/AppButton/AppButton.Component';
import AppInputField from '../../components/AppForm/AppInputField/AppInputField.Component';
import AppSelectField from '../../components/AppForm/AppSelectField/AppSelectField.Component';

class HomePage extends React.Component {
  state = {
    department: "",
    faculty: "",
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('on submit');
  }

  handleOnChange = (event) => {
    const { value, name } = event.target;
  
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="home-page page-container">
        <div className="page-title">
          <p>Provid Feedback</p>
        </div>
  
        <form className="feedback-form" onSubmit={this.handleFormSubmit}>
          <AppSelectField
            type="text"
            name="department"
            placeholder="Department"
            options={["MCA"]}
            handleOnChange={this.handleOnChange}
          />
          <AppSelectField
            type="text"
            name="faculty"
            placeholder="Faculty"
            options={["Rajesh", "Naveen", "Reshma"]}
            handleOnChange={this.handleOnChange}
          />
          <AppInputField
            type="text"
            name="feedback"
            placeholder="Feedback"
            value=""
            handleOnChange={this.handleOnChange}
          />

          <AppButton type="submit" value="Submit">Submit</AppButton>
        </form>
      </div>
    )
  }
}

export default HomePage;
