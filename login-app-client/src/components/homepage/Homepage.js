import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import generateAccessToken from "../../helpers/generateAccessToken";
import { userActions } from "../../store";

import "./homepage.css";

const Homepage = () => {
     const accessToken = useSelector((state) => state.user.accessToken);
     const refreshToken = useSelector((state) => state.user.refreshToken);
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const checkLogin = async (accessToken) => {
          const url = "http://localhost:5000/private/private1";
          const res = await fetch(url, {
               method: "GET",
               headers: {
                    Authorization: `Bearer ${accessToken}`,
               },
          });
          console.log(res);
          const response = await res.json();
          console.log("1111111111111111111111111111111111111111111111111", response);
          if (response.statusCode === 200) {
               dispatch(userActions.login());
               navigate("/private");
               return;
          }
          const refreshTokenResponse = await generateAccessToken(refreshToken);
          console.log("1111111111111111111111111111111111111111111111111", refreshTokenResponse);

          if (refreshTokenResponse.statusCode === 200) {
               dispatch(userActions.login());
               dispatch(userActions.setAccessToken(refreshTokenResponse.data));
               navigate("/private");
               return;
          }
     };

     useEffect(() => {
          checkLogin(accessToken);
     }, []);

     return <h1 className="homepage-title">Welcome To Homepage</h1>;
};

export default Homepage;
