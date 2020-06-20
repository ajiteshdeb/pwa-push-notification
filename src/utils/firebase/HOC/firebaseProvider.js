import React from 'react';
import FirebaseContext from '../context';
import Firebase from '../firebase';

class FirebaseProvider extends React.Component {
  render() {
      return (
          <FirebaseContext.Provider
              value={new Firebase()}
          >
              {this.props.children}
          </FirebaseContext.Provider>
      );
  }
}
export default FirebaseProvider;