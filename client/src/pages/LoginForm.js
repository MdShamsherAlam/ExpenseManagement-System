// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { message } from 'antd';

// const LoginForm = () => {
//   // const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   //from submit
//   const submitHandler = async (values) => {
//     try {
//       // setLoading(true);
//       const { data } = await axios.post("/login", values);
//       // setLoading(false);
//       message.success("login success");
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ ...data.user, password: "" })
//       );
//       navigate("/");
//     } catch (error) {
//       // setLoading(false);
//       message.error("something went wrong");
//     }
//   };

//   //prevent for login user
//   useEffect(() => {
//     if (localStorage.getItem("user")) {
//       navigate("/");
//     }
//   }, [navigate]);

//   return (
//     <div>
//       <section className="vh-100">
//         <div className="container py-5 h-100">
//           <div className="row d-flex align-items-center justify-content-center h-100">
//             <div className="col-md-8 col-lg-7 col-xl-6">
//               <img
//                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
//                 className="img-fluid"
//                 alt="Phone image"
//               />
//             </div>
//             <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
//               <form>
//                 {/* Email input */}
//                 <input
//                   type="email"
//                   id="email"
//                   className="form-control form-control-lg"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 <label className="form-label" htmlFor="email">
//                   Email address
//                 </label>

//                 <input
//                   type="password"
//                   id="password"
//                   className="form-control form-control-lg"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <label className="form-label" htmlFor="password">
//                   Password
//                 </label>

//                 <div className="d-flex justify-content-around align-items-center mb-4">
//                   {/* Checkbox */}
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       value=""
//                       id="form1Example3"
//                       defaultChecked
//                     />
//                     <label className="form-check-label" htmlFor="form1Example3">
//                       Remember me
//                     </label>
//                   </div>
//                   <a href="#!">Forgot password?</a>
//                 </div>

//                 {/* Submit button */}
//                 <button type="submit" className="btn btn-primary btn-lg btn-block">
//                   Sign in
//                 </button>

//                 <div className="divider d-flex align-items-center my-4">
//                   <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
//                 </div>

//                 <a
//                   className="btn btn-primary btn-lg btn-block"
//                   style={{ backgroundColor: '#3b5998' }}
//                   href="/register"
//                   role="button"
//                 >
//                   <i className="fab fa-facebook-f me-2"></i>New User Register Here
//                 </a>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>



//   );
// };

// export default LoginForm;

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
