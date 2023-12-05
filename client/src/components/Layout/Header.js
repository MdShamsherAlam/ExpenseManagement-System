

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { message } from 'antd';
// import axios from 'axios';

// const Header = () => {
//     const navigate = useNavigate();
//     const loggedIn = localStorage.getItem("token");

//     // Function to get the user name from the token in localStorage
//     const getUserName = () => {
//         if (loggedIn) {
//             const tokenData = JSON.parse(loggedIn);
//             return tokenData.name;
//         }
//         return null;
//     };

//     const handleLogout = async () => {
//         try {
//             await axios.post("/logout");
//             localStorage.removeItem("token");
//             message.success("Logout successfully");
//             navigate("/login");
//         } catch (error) {
//             message.error('Something went wrong');
//         }
//     };
//     const usernName = () => {

//     }

//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarTogglerDemo01"
//                     aria-controls="navbarTogglerDemo01"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon" />
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//                     <Link className="navbar-brand" to="/">
//                         Expense Management
//                     </Link>
//                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             {/* Display the user name inside the button */}
//                             <button className="btn btn-primary" onClick={usernName}>
//                                 {getUserName()}
//                             </button>
//                         </li>
//                         <li className="nav-item">
//                             <button className="btn btn-danger" onClick={handleLogout}>
//                                 Logout
//                             </button>
//                             <button className="btn btn-primary" >
//                                 singUp
//                             </button>
//                             <button className="btn btn-primary" >
//                                 Login
//                             </button>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Header;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("token");

    // Function to get the user name from the token in localStorage
    const getUserName = () => {
        if (loggedIn) {
            const tokenData = JSON.parse(loggedIn);
            return tokenData.name;
        }
        return null;
    };

    const handleLogout = async () => {
        try {
            await axios.post("/logout");
            localStorage.removeItem("token");
            message.success("Logout successfully");
            navigate("/login");
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse nav" id="navbarTogglerDemo01">
                    <Link className="navbar-brand" to="/">
                        Expense Management
                    </Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {loggedIn ? (
                            <li className="nav-item">
                                {/* Display the user name inside the button */}
                                <button className="btn btn-primary" onClick={getUserName}>
                                    {getUserName()}
                                </button>
                                <button className="btn btn-danger" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/signup" className="btn btn-primary">
                                        Signup
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="btn btn-primary">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
