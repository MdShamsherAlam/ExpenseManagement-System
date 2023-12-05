import { Form, Input, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        // repeatPassword: '',
    });

    const handleChange = (e) => {
        // Update the form data when the input values change
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            // Make a POST request to your server's '/users/register' endpoint
            await axios.post('/register', formData);

            // Redirect to the login page after successful registration
            navigate('/login');

            // Optionally, you can show a success message
            message.success('Registration successful!');
        } catch (error) {
            // Handle registration errors
            console.error('Registration failed:', error);

            // Optionally, you can show an error message
            message.error('Registration failed. Please try again.');
        }
    };
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);


    return (
        <>
            <div className="resgister-page ">
                <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
                    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card" style={{ borderRadius: '15px' }}>
                                        <div className="card-body p-5">
                                            <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                            <form>
                                                <div className="form-outline mb-4">
                                                    <input type="text" id="name" className="form-control form-control-lg" value={formData.name} onChange={handleChange} />
                                                    <label className="form-label" htmlFor="name">Your Name</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="email" id="email" className="form-control form-control-lg" value={formData.email} onChange={handleChange} />
                                                    <label className="form-label" htmlFor="email">Your Email</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="password" id="password" className="form-control form-control-lg" value={formData.password} onChange={handleChange} />
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="password" id="repeatPassword" className="form-control form-control-lg" value={formData.repeatPassword} onChange={handleChange} />
                                                    <label className="form-label" htmlFor="repeatPassword">Repeat your password</label>
                                                </div>

                                                <div className="d-flex justify-content-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                        onClick={handleSubmit}
                                                    >
                                                        Register
                                                    </button>
                                                </div>

                                                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="/login" className="fw-bold text-body"><u>Login here</u></a></p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Register
