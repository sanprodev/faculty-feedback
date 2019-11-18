import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppHeader from './components/AppHeader/AppHeader.Component';
import LoginPage from './pages/auth/login/login.page';
import RegisterPage from './pages/auth/register/register.page';
import HomePage from './pages/home/home.page';
import AuthProvider, { AuthContext } from './pages/auth/auth.page';

import PrivateRoute from './PrivateRoute';

import './App.css';

const App = () => {
  const currentUser = React.useContext(AuthContext);
  console.log('currentUSer in App', currentUser);

  return (
    <div className="app">
      <AuthProvider>
        { currentUser ? <AppHeader /> : null }
        <Switch>
          <PrivateRoute path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </AuthProvider>
    </div>
  )
}

export default App;
