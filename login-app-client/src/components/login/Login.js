import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { userActions } from "../../store";

const Login = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const toastifyOptions = {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
     };

     const login = async (event) => {
          event.preventDefault();
          const url = "http://localhost:5000/auth/login";
          const res = await fetch(url, {
               method: "POST",
               body: JSON.stringify({ email: email, password: password }),
               headers: {
                    "Content-Type": "application/json",
               },
          });
          const response = await res.json();

          if (response.statusCode === 201 || response.statusCode === 200) {
               localStorage.setItem("accessToken", response.data.accessToken);
               localStorage.setItem("refreshToken", response.data.refreshToken);

               toast.success(response.message, toastifyOptions);
               setTimeout(() => {
                    dispatch(userActions.login({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }));
                    navigate("/private");
               }, 1000);
          } else if (Array.isArray(response.error.message)) {
               toast.error(Object.values(response.error.message[0]).toString(), toastifyOptions);
          } else {
               toast.error(response.error.message, toastifyOptions);
          }
     };

     return (
          <div className="Auth-form-container">
               <form className="Auth-form">
                    <div className="Auth-form-content">
                         <h3 className="Auth-form-title">Login</h3>
                         <div className="form-group mt-3">
                              <label>Email address</label>
                              <input
                                   type="email"
                                   className="form-control mt-1"
                                   placeholder="Enter email"
                                   onChange={(event) => setEmail(event.target.value)}
                              />
                         </div>
                         <div className="form-group mt-3">
                              <label>Password</label>
                              <input
                                   type="password"
                                   className="form-control mt-1"
                                   placeholder="Enter password"
                                   onChange={(event) => setPassword(event.target.value)}
                              />
                         </div>
                         <div className="d-grid gap-2 mt-3">
                              <button type="submit" className="btn btn-primary" onClick={login}>
                                   Login
                              </button>
                         </div>
                         <p className="forgot-password text-right mt-2">
                              Don't have an account? <Link to={"/signup"}>Sign Up</Link> Instead
                         </p>
                    </div>
               </form>
               <ToastContainer />
          </div>
     );
};

export default Login;
