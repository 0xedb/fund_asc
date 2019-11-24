import React, {useState} from 'react';
import {Form, Input, Icon, message} from 'antd';
import {useFormik} from 'formik';
import {useFirebase} from 'gatsby-plugin-firebase';
import {sendEmail} from '../utils/firebase';

interface Values {
  [key: string]: string;
}

interface FormError extends Values {}

function Index() {
  const [sendMail, setSendMail] = useState(false);

  useFirebase(
    firebase => {
      if (sendMail) {
        sendEmail({firebase, email: formik.values.email}).then(() => {
          message.success('email sent');
        });
      }
    },
    [sendMail]
  );

  const errors: FormError = {};
  const validate = (values: Values) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.email) errors.email = 'email is required';
    else if (!re.test(values.email.toLowerCase()))
      errors.email = 'invalid email address';

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      console.log('Submitted: \t :', values);
      setSendMail(true);
    },
    validate,
  });

  const send = (
    <Icon
      type="arrow-right"
      onClick={() => {
        formik.submitForm();
      }}
    />
  );

  const emailIcon = <Icon type="mail" />;

  return (
    <div>
      <Form>
        <Form.Item>
          <Input
            id="email"
            type="email"
            placeholder="email"
            size="large"
            addonAfter={send}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email
            ? <div>
                {formik.errors.email}
              </div>
            : null}
        </Form.Item>
      </Form>
    </div>
  );
}

export default Index;
