import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import AppButton from '../../../components/AppButton/AppButton.Component';
import AppInputFiled from '../../../components/AppForm/AppInputField/AppInputField.Component';
import AppSelectField from '../../../components/AppForm/AppSelectField/AppSelectField.Component';

import './register.styles.scss';

import { AuthContext } from '../auth.page';
import { register } from '../../../firebase/auth.firebase';

class RegisterPage extends React.Component {
  static contextType = AuthContext;

  state = {
    name: '',
    studentId: '',
    department: "",
    semester: "",
    email: '',
    password: ''
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await register({...this.state});

      this.setState({
        name: '',
        studentId: '',
        department: '',
        semester: '',
        email: '',
        password: ''
      });
      this.props.history.push('/');
    }
    catch(error) {
      console.log('Error', error.message);
    }
  }

  handleOnChange = (event) => {
    const { value, name } = event.target;
  
    this.setState({ [name]: value });
  }

  render() {
    const currentUser = this.context;
    const { name, studentId, email, password } = this.state;

    return (
      <>
        {currentUser ? (
          <Redirect to="/" />
        ) : (
          <div className="register-page">
            <div className="container">
              <div className="title">
                Please Register
              </div>

              <form onSubmit={this.handleFormSubmit}>
                <AppInputFiled
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  handleOnChange={this.handleOnChange}
                />
                <AppInputFiled
                  type="text"
                  name="studentId"
                  placeholder="Student Id"
                  value={studentId}
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
                  name="semester"
                  placeholder="Semester"
                  options={[1, 2, 3, 4, 5, 6]}
                  handleOnChange={this.handleOnChange}
                />
                <AppInputFiled
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  handleOnChange={this.handleOnChange}
                />
                <AppInputFiled
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  handleOnChange={this.handleOnChange}
                />

                <AppButton type="submit" value="Submit">Register</AppButton>
              </form>

              <Link to="/login">Already have an account? Login Here!</Link>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default RegisterPage;
