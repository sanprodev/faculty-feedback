import React from 'react';

import { logout } from '../../firebase/auth.firebase';

import './AppHeader.Styles.scss';
import logo from '../../assets/images/logo.png';

class Header extends React.Component {
  render() {
    return(
      <header className="header">
        <div className="logo">
          <img src={logo} alt="app-logo"/>
        </div>
        <div className="title">
          Faculty Feedback
        </div>
        <div className="options" onClick={() => logout()}>
          logout
        </div>
      </header>
    )
  }
}

export default Header;
