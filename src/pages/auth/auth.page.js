import React from 'react';

import { auth } from '../../firebase/config.firebase';
// import { getUserByKey } from '../../firebase/user.firebase';

export const AuthContext = React.createContext(null);

class AuthProvider extends React.Component {
  state = {
    currentUser: null
  }

  componentDidMount() {
    console.log('auth page mounted')
    auth.onAuthStateChanged(async user => {
      if(user) {
        // const userDetails = await getUserByKey(user.uid);
        // console.log('user', userDetails);

        this.setState({
          currentUser: {
            id: user.uid,
            email: user.email
          }
        });
      }
      else this.setState({ currentUser: user });
    });
  }

  render() {
    const { currentUser } = this.state;

    return(
      <AuthContext.Provider value={ currentUser }>
        { this.props.children }
      </AuthContext.Provider>
    )
  }
}

export default AuthProvider;
