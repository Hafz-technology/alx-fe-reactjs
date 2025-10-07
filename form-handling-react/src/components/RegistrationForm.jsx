import React, { useState } from 'react';
import './RegistrationForm.css'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, 
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };


  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
     
      console.log('Form data is valid. Submitting:', formData);
      alert('Registration successful! (Check console for data)');
    
      setFormData({ username: '', email: '', password: '' });
    } else {
      console.log('Form submission failed due to validation errors.');
    }
  };

  return (
    <div className="registration-container">
      <h2>User Registration </h2>
      <form onSubmit={handleSubmit} className="registration-form">
      
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username} 
            onChange={handleChange}     
            placeholder="Enter your username"
            aria-required="true"
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

     
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email} 
            onChange={handleChange}
            placeholder="Enter your email address"
            aria-required="true"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

       
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password} 
            onChange={handleChange}
            placeholder="Enter a strong password"
            aria-required="true"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;

// "value={username}", "value={email}", "value={password}"