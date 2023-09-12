import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store";

const NavBar = () => {
     const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const signOut = () => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(userActions.logout());
          dispatch(userActions.setAccessToken(null));
          dispatch(userActions.setRefreshToken(null));
          navigate("/login");
     };
     return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
               <div className="container">
                    <Link className="navbar-brand" to="/">
                         LOGIN APP
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                         <ul className="navbar-nav ml-auto">
                              {!isLoggedIn && (
                                   <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                             Login
                                        </Link>
                                   </li>
                              )}
                              {!isLoggedIn && (
                                   <li className="nav-item">
                                        <Link className="nav-link" to="/signup">
                                             Signup
                                        </Link>
                                   </li>
                              )}
                              {isLoggedIn && (
                                   <li className="nav-item">
                                        <Link className="nav-link" to={"/private"}>
                                             Private
                                        </Link>
                                   </li>
                              )}
                              {isLoggedIn && (
                                   <li className="nav-item">
                                        <button className="nav-link" onClick={signOut} style={{ marginLeft: "65rem" }}>
                                             Sign out
                                        </button>
                                   </li>
                              )}
                         </ul>
                    </div>
               </div>
          </nav>
     );
};

export default NavBar;
