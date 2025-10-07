// import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FormikForm.css'; 

// 1. Define the Validation Schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});


const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    // 3. Form submission logic (Simulated API call)
    console.log('Formik Form Data:', values);

    // Set status to indicate submission is in progress (optional)
    setStatus({ success: false, message: '' }); 
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false); // Stop the loading state
      
      // On success: Display success message and optionally reset form
      setStatus({ success: true, message: 'Registration successful! (Check Console)' });
      resetForm(); // Uncomment to clear form fields after submission

      // NOTE: In the next step, you will replace this with a real fetch call.
      
    }, 1500);
  };

  return (
    <div className="registration-container">
      <h2>User Registration (Formik)</h2>
      
      {/* 2. Integrate Formik */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* Formik provides props like isSubmitting, errors, touched, etc. */}
        {({ isSubmitting, status }) => (
          <Form className="registration-form">
            
            {/* Username Field */}
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              {/* Formik's Field component handles value, onChange, and onBlur */}
              <Field type="text" id="username" name="username" disabled={isSubmitting} />
              {/* Formik's ErrorMessage displays validation errors */}
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" disabled={isSubmitting} />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" disabled={isSubmitting} />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            {/* Display Submission Status/Error */}
            {status?.message && (
                <p className={status.success ? 'success-message' : 'error-message'}>
                    {status.success ? '✅ ' : '❌ '} {status.message}
                </p>
            )}

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;