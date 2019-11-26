import React from 'react';
// components
import AppButton from '../../components/AppButton/AppButton.Component';
import AppInputField from '../../components/AppForm/AppInputField/AppInputField.Component';
import AppSelectField from '../../components/AppForm/AppSelectField/AppSelectField.Component';
// styles
import './admin.styles.scss';
// firebase helper
import { addNewFaculty, getFaculties } from '../../firebase/faculty.firebase';

class AdminPage extends React.Component {
  state = {
    viewFeedback: true,
    addFaculty: false,
    newFaculty: {
      name: '',
      department: '',
      designation: '',
      qualification: '',
      specialization: '',
    },
    selectedFaculty: {
      department: '',
      faculty: '',
    },
    faculties: [],
    requestSuccess: false,
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
    event.preventDefault();
    const { selectedFaculty } = this.state;
    const { department, faculty } = selectedFaculty;

    if(department !== '' || faculty !== '') {
      this.props.history.push({
        pathname: '/feedbacks',
        state: { faculty: selectedFaculty }
      });
    }
  }

  handleOnSubmitAddFaculty = async (event) => {
    event.preventDefault();
    const { newFaculty } = this.state;

    try {
      const response = await addNewFaculty(newFaculty);
      console.log('response', response);
      this.setState(prevState => ({
        ...prevState,
        requestSuccess: true,
        newFaculty: {
          name: '',
          department: '',
          designation: '',
          qualification: '',
          specialization: '',
        },
      }));
    }
    catch (error) {
      console.log('Error', error.message);
    }
  }

  handleOnChangeSelectFaculty = (event) => {
    const { value, name } = event.target;
    const selectedFaculty = {...this.state.selectedFaculty}
    selectedFaculty[name] = value;

    this.setState({ selectedFaculty });
  }

  handleOnChangeAddFaculty = (event) => {
    const { value, name } = event.target;
    const newFaculty = {...this.state.newFaculty}
    newFaculty[name] = value;

    this.setState({ newFaculty });
  }

  async componentDidMount() {
    try {
      const faculties = await getFaculties();
      this.setState({ faculties });
    }
    catch(error) {
      console.log('Error', error.message);
    }
  }

  componentDidUpdate() {
    const { requestSuccess } = this.state;
    if(requestSuccess) {
      setTimeout(() => {
        this.setState({ requestSuccess: false });
      }, 4000);
    }
  }

  render() {
    const {
      viewFeedback, 
      addFaculty,
      newFaculty,
      faculties,
      requestSuccess,
    } = this.state;

    return (
      <div className="admin-page page-container">
        { requestSuccess ? (
          <div className="success">
            Faculty Added Successfully
          </div>
        ): null }

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
                handleOnChange={this.handleOnChangeSelectFaculty}
              />
              <AppSelectField
                type="text"
                name="faculty"
                placeholder="Faculty"
                options={faculties.map(faculty => faculty.name)}
                handleOnChange={this.handleOnChangeSelectFaculty}
              />

              <AppButton type="submit" value="Submit">Submit</AppButton>
            </form>
          </div>
        ) : null }

        {addFaculty ? (
          <div className="add-faculty">
            <div className="page-title">Please fill the form to add a faculty</div>
            <form onSubmit={this.handleOnSubmitAddFaculty}>
              <AppInputField
                type="text"
                name="name"
                placeholder="Name"
                value={newFaculty.name}
                handleOnChange={this.handleOnChangeAddFaculty}
              />
              <AppSelectField
                type="text"
                name="department"
                placeholder="Department"
                options={["MCA"]}
                value={newFaculty.department}
                handleOnChange={this.handleOnChangeAddFaculty}
              />
              <AppSelectField
                type="text"
                name="designation"
                placeholder="Designation"
                options={["Assistant Professor", "Professor"]}
                value={newFaculty.designation}
                handleOnChange={this.handleOnChangeAddFaculty}
              />
              <AppInputField
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={newFaculty.qualification}
                handleOnChange={this.handleOnChangeAddFaculty}
              />
              <AppInputField
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={newFaculty.specialization}
                handleOnChange={this.handleOnChangeAddFaculty}
              />

              <AppButton type="submit" value="Submit">
                { !requestSuccess ? "Submit" : "Processing....." }
              </AppButton>
            </form>
          </div>
        ) : null }
      </div>
    )
  }
}

export default AdminPage;
