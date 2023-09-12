import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
     const navigate = useNavigate();

     const toastifyOptions = {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
     };

     const signUp = async (event) => {
          event.preventDefault();
          const url = "http://localhost:5000/auth/signup";
          console.log(email, password, confirmPassword);
          const res = await fetch(url, {
               method: "POST",
               body: JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword }),
               headers: {
                    "Content-Type": "application/json",
               },
          });
          const response = await res.json();
          console.log(response);

          if (response.statusCode === 201 || response.statusCode === 200) {
               toast.success(response.message, toastifyOptions);
               navigate("/login");
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
                         <h3 className="Auth-form-title">Sign Up</h3>
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
                         <div className="form-group mt-3">
                              <label>Confirm Password</label>
                              <input
                                   type="password"
                                   className="form-control mt-1"
                                   placeholder="Enter password"
                                   onChange={(event) => setConfirmPassword(event.target.value)}
                              />
                         </div>

                         <div className="d-grid gap-2 mt-3">
                              <button type="submit" onClick={signUp} className="btn btn-primary">
                                   Sign Up
                              </button>
                         </div>
                         <p className="forgot-password text-right mt-2">
                              Have an Account? <Link to={"/login"}>LogIn</Link> Instead
                         </p>
                    </div>
               </form>
               <ToastContainer />
          </div>
     );
};

export default Signup;
