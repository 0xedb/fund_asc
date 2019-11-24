interface EmailProps {
  email: string;
  firebase: Function;
}

const actionCodeSettings = {
  url: 'http://localhost:8000/',
  handleCodeInApp: true,
};

const sendEmail = async ({email, firebase}: EmailProps) => {
  firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      // save email in localStorage to use later
      console.log('email sent');
    })
    .catch(err => console.log('Error occured: ', err));
};

export {sendEmail};
