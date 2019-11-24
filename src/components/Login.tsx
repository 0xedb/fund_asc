import React, {useState} from 'react';
import {useFirebase} from 'gatsby-plugin-firebase';

function Login() {
  const [login, setLogin] = useState(false);

  useFirebase(firebase => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      console.log('Wow LOGIN');
      const email = window.localStore.getItem('fund_user');
      if (email) {
      }
    }
  }, []);

  return <div>daf</div>;
}

export default Login;
