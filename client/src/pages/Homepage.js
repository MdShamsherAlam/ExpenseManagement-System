import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import '../pages/Register.css';
import { message } from 'antd';
import TransactionTable from './TransactionTable';
const Homepage = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        reference: '',
        description: '',
        date: '',
    });
    const [authToken, setAuthToken] = useState('');
    useEffect(() => {
        const tokenDataString = localStorage.getItem('token');
        if (tokenDataString) {
            const tokenData = JSON.parse(tokenDataString);


            const token = tokenData.token;

            setAuthToken(token);
        }
    }, []);
    const handleClose = () => setShowForm(false);
    const handleShow = () => setShowForm(true);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v2/transection/add-transection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, // Include the token in the Authorization header
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                message.success('Add successfully');
                handleClose();
            } else {
                message.error('Something  wrong');
                console.error('Error adding transaction:', response.statusText);
            }
        } catch (error) {
            message.error('Something wrong on Server');
            console.error('Error adding transaction:', error.message);
        }
    };

    return (
        <Layout>
            <div className={`container ${showForm ? 'modal-open' : ''}`}>
                <h1 className="text-center">HomePage</h1>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <h3>Range Filter Text</h3>
                    <button className="btn btn-primary" onClick={handleShow}>
                        Add
                    </button>
                </div>
            </div>

            {/* Add Modal for Form */}
            {showForm && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Item</h5>
                                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="amount">Amount</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="amount"
                                            placeholder="Enter amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="category"
                                            placeholder="Enter category"
                                            value={formData.category}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="reference">Reference</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="reference"
                                            placeholder="Enter reference"
                                            value={formData.reference}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            rows="3"
                                            placeholder="Enter description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <TransactionTable />
        </Layout>
    );
};

export default Homepage;
