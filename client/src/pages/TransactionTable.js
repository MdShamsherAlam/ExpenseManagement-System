import React, { useState, useEffect } from 'react';

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Replace 'yourTokenKey' with the actual key used to store the token

                if (!token) {
                    // Handle the case where the token is not available
                    console.error('JWT token is missing');
                    return;
                }

                const response = await fetch('http://localhost:8080/api/v2/transaction/FetchData', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    // Handle the case where the request was not successful
                    console.error('Failed to fetch data:', response.status, response.statusText);
                    return;
                }

                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount


    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Reference</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.amount}</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.reference}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionTable;
