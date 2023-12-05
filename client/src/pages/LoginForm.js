

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const LoginForm = () => {
  const navigate = useNavigate();

  // Assuming you have formData and handleChange defined somewhere
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Form submit handler
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const data = await axios.post('/login', formData);
      message.success('Login success');
      const tokenData = {
        token: data.data.token,
        name: data.data.userName
      };
      // Convert the object to a JSON string
      var tokenDataString = JSON.stringify(tokenData);

      localStorage.setItem('token', tokenDataString);
      navigate('/');
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  // Prevent login for an already logged-in user
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={submitHandler}>
                {/* Email input */}
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="email">
                  Email address
                </label>

                {/* Password input */}
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>

                {/* Other form elements... */}

                {/* Submit button */}
                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  Sign in
                </button>

                {/* Other JSX elements... */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
