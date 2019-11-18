import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from './pages/auth/auth.page';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const currentUser = React.useContext(AuthContext);
  console.log('context in privateRoute', currentUser);

  return (
    <Route {...rest} render={props => {
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }

      // check if route is restricted by role
      // if (roles && roles.indexOf(currentUser.role) === -1) {
      //   // role not authorised so redirect to home page
      //   return <Redirect to={{ pathname: '/'}} />
      // }

      // if (roles && currentUser.email === "admin@gmail.com") {
      //   console.log('in roles', currentUser);
      //   // role not authorised so redirect to home page
      //   // return <Redirect to={{ pathname: '/admin', state: { from: props.location } }} />
      // }

      // authorised so return component
      return <Component {...props} />
    }} />
  )
}

export default PrivateRoute;
