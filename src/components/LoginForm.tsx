import React, {useState} from 'react';
import {Form, Input, Icon, message} from 'antd';
import {useFormik} from 'formik';
import {useFirebase} from 'gatsby-plugin-firebase';

interface Values {
  [key: string]: string;
}

export interface Params {
  firebase: Function;
  email: string;
}

interface Props {
  onSubmit: ({firebase, email}: Params) => void;
}

interface FormError extends Values {}

function LoginForm({onSubmit}: Props) {
  const [sendMail, setSendMail] = useState(0);

  const errors: FormError = {};
  const validate = (values: Values) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.email) errors.email = 'email is required';
    else if (!re.test(values.email.toLowerCase()))
      errors.email = 'invalid email address';

    return errors;
  };

  const initialValues = {
    email: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      console.log('Submitted: \t :', values);
      setSendMail(prev => ++prev);
    },
    validate,
  });

  useFirebase(
    firebase => {
      if (sendMail) {
        onSubmit({firebase, email: formik.values.email});
        formik.resetForm();
      }
    },
    [sendMail]
  );

  const send = (
    <Icon
      type="arrow-right"
      onClick={() => {
        formik.submitForm();
      }}
    />
  );

  return (
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
  );
}

export default LoginForm;
