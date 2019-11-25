import React, {useState} from 'react';
import {useFirebase} from 'gatsby-plugin-firebase';
import LoginForm from './LoginForm';
import {Params} from './LoginForm';
import {message} from 'antd';

enum PageNavigationType {
    RENDER,
    DIRECT,
    EMAIL,
    EMAIL_EXTERNAL
}


function Login() {
  const [login, setLogin] = useState(PageNavigationType.RENDER);

  const onSubmit = (params: Params) => { 
    params.firebase.auth().signInWithEmailLink(params.email, window.location.href).
    then(result => {
        window.localStorage.removeItem(params.email);
        console.log(result);
        window.location.replace('/forms')
    })
    .catch(err => {
        console.log('Error!', err)
        message.error({content: `${err}`, duration: 5})
    })
    
}

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

  const showMessage = () => {
      message.destroy();
    message.warn({content: "enter email to login", duration: 5})
  }


  const toBeRendered = () => { 
      switch(login) {
          case PageNavigationType.DIRECT:
              return <>{window.location.replace('/')}</>;
        case PageNavigationType.EMAIL: 
        return <>{window.location.replace('/forms')}</>
        case PageNavigationType.EMAIL_EXTERNAL:
            return <div><LoginForm onSubmit={onSubmit} />{showMessage()}</div>;
        case PageNavigationType.RENDER:
            return <></>;
        default: 
        return <>{window.location.replace('/')}</>;
      }
  }
   

  return ( 
      <>{toBeRendered()}</>
  );
}

export default Login;
