import React from 'react';
import FirebaseContext from '../context';

export function withFirebaseContext(Component) {
  return function WrapperComponent(props) {
    return (
      <FirebaseContext.Consumer>
        {(contexts) => <Component {...props} {...contexts} />
        }
      </FirebaseContext.Consumer>
    )
  }
}