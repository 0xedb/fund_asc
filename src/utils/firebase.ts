interface EmailProps {
  email: string;
  firebase: Function;
}

const actionCodeSettings = {
  url: 'http://localhost:8000/login',
  handleCodeInApp: true,
};

const sendEmail = async ({email, firebase}: EmailProps) => {
  firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => { 
      window.localStorage.setItem('fund_user', btoa(email));
      console.log('email sent');
    })
    .catch(err => console.log('Error occured: ', err));
};

export {sendEmail};
