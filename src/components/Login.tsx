import React, {useState} from 'react';
import {useFirebase} from 'gatsby-plugin-firebase';
import LoginForm from './LoginForm';
import {Params} from './LoginForm';

enum PageNavigationType {
    RENDER,
    DIRECT,
    EMAIL,
    EMAIL_EXTERNAL
}

const onSubmit = (params: Params) => {
    
}

function Login() {
  const [login, setLogin] = useState(PageNavigationType.RENDER);

  useFirebase(firebase => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) { 
      const email = window.localStorage.getItem('fund_user');
      if (email) {
        setLogin(PageNavigationType.EMAIL);
      } else {
        setLogin(PageNavigationType.EMAIL_EXTERNAL);
      }
    } else  setLogin(PageNavigationType.DIRECT)
  }, []);


  const toBeRendered = () => {
      console.log('TYPE', login)
      switch(login) {
          case PageNavigationType.DIRECT:
              return <>{window.location.replace('/')}</>;
        case PageNavigationType.EMAIL: 
        return <>{window.location.replace('/forms')}</>
        case PageNavigationType.EMAIL_EXTERNAL:
            return <div><LoginForm {...onSubmit} /></div>;
        case PageNavigationType.RENDER:
            return <></>;
        default: 
        return <>{window.location.replace('/')}</>;
      }
  }
  

  const toRender = login
    ? <div id="sign-in" className="">
    {window.location.replace('/forms')}    
      </div>
    : <div><LoginForm {...onSubmit} /></div>;

  return ( 
      <>{toBeRendered()}</>
  );
}

export default Login;
