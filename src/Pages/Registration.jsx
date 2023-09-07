// import React from 'react';

// const Registration=()=>{
//     return(
//         <div>This is registration page</div>
//     );
// }

// export default Registration;

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import "./Registration.css"

function Registration() {

    let navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    username: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required').min(2,"password is too short").max(16,"password is too long"),
    username: Yup.string().required('Required').min(4,"username is too short"),
  });
  const RegistrationSuccess = () => {
    navigate("/login");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log('Registration successful');
        RegistrationSuccess();
        console.log(values)
      } else {
        console.error('Registration failed');
        // Handle failure or display error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error or display error message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div>
            <h3>REGISTRATION TO BOLETO</h3>
        <Form className='text'>
            
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-control"
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="form-control"
            />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              className="form-control"
            />
            <ErrorMessage name="username" component="div" className="text-danger" />
          </div>
         
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          <br/>
          <p>Already have an account? Login<a href="/login">here.</a></p>

        </Form>
        </div>
        
      )}
    </Formik>
  );
};


export default Registration;
