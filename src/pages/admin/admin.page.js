import React from 'react';

import './admin.styles.scss';

import AppButton from '../../components/AppButton/AppButton.Component';
import AppInputField from '../../components/AppForm/AppInputField/AppInputField.Component';
import AppSelectField from '../../components/AppForm/AppSelectField/AppSelectField.Component';

class AdminPage extends React.Component {
  state = {
    viewFeedback: true,
    addFaculty: false
  }

  viewFeedback = () => {
    this.setState({ 
      viewFeedback: true,
      addFaculty: false
    });
  }

  addFaculty = () => {
    this.setState({ 
      viewFeedback: false,
      addFaculty: true
    });
  }
 
  handleOnSubmitViewFeedback = (event) => {
    event.preventDefault()
  }

  handleOnSubmitAddFaculty = (event) => {
    event.preventDefault()
  }

  handleOnChange = () => {
    console.log('on change');
  }

  render() {
    const { viewFeedback, addFaculty } = this.state;

    return (
      <div className="admin-page page-container">
        <div className="actions">
          <AppButton
            type="button"
            style={{background: "#90A4AE", height: "35px"}}
            handleOnClick={this.viewFeedback}
          >
            View Feedback
          </AppButton>
          <AppButton
            type="button"
            style={{background: "#90A4AE", height: "35px"}}
            handleOnClick={this.addFaculty}
          >
            Add Faculty
          </AppButton>
        </div>

        {viewFeedback ? (
          <div className="view-feedback">
            <div className="page-title">Please select the department and faculty name</div>
            <form onSubmit={this.handleOnSubmitViewFeedback}>
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

              <AppButton type="submit" value="Submit">Submit</AppButton>
            </form>
          </div>
        ) : null }

        {addFaculty ? (
          <div className="add-faculty">
            <div className="page-title">Please fill the form to add a faculty</div>
            <form onSubmit={this.handleOnSubmitViewFeedback}>
              <AppInputField
                type="text"
                name="name"
                placeholder="Name"
                value=""
                handleOnChange={this.handleOnChange}
              />
              <AppSelectField
                type="text"
                name="department"
                placeholder="Department"
                options={["MCA"]}
                handleOnChange={this.handleOnChange}
              />
              <AppSelectField
                type="text"
                name="designation"
                placeholder="Designation"
                options={["Assistant Professor", "Professor"]}
                handleOnChange={this.handleOnChange}
              />
              <AppInputField
                type="text"
                name="qualification"
                placeholder="Qualification"
                value=""
                handleOnChange={this.handleOnChange}
              />
              <AppInputField
                type="text"
                name="specialization"
                placeholder="Specialization"
                value=""
                handleOnChange={this.handleOnChange}
              />

              <AppButton type="submit" value="Submit">Submit</AppButton>
            </form>
          </div>
        ) : null }
      </div>
    )
  }
}

export default AdminPage;
