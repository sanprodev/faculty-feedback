import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import AppButton from '../../../components/AppButton/AppButton.Component';
import AppInputFiled from '../../../components/AppForm/AppInputField/AppInputField.Component';

import './login.styles.scss';

import { AuthContext } from '../auth.page';
import { login } from '../../../firebase/auth.firebase';

class LoginPage extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
    }
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      const user = await login(email, password);

      this.setState({ email: '', password: '' });
  
      if(user.email === "admin@gmail.com") return this.props.history.push('/admin');
      return this.props.history.push('/');
    }
    catch (error) {
      console.log('Error', error.message);
      this.setState({ error: error.message });
    }
  }

  handleOnChange = (event) => {
    const { value, name } = event.target;
  
    this.setState({ [name]: value });
  }

  componentDidUpdate() {
    const { error } = this.state;
    if(error) {
      setTimeout(() => {
        this.setState({ error: '' });
      }, 4000);
    }
  }

  render() {
    const { email, password, error } = this.state;
    const currentUser = this.context;

    return (
      <>
        {currentUser ? (
          currentUser.email === "admin@gmail.com" ? (
            <Redirect to="/admin" />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <div className="login-page">
            { error ? (
              <div className="error">
                { error }
              </div>
            ) : null}
            <div className="container">
              <div className="title">
                Please Login
              </div>

              <form onSubmit={this.handleFormSubmit}>
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

                <AppButton type="submit" value="Submit">Login</AppButton>
              </form>

              <Link to="/register">Create a new account</Link>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default LoginPage;
