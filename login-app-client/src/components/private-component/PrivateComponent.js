import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import generateAccessToken from "../../helpers/generateAccessToken";
import { toast, ToastContainer } from "react-toastify";
import { userActions } from "../../store";

const PrivateComponent = () => {
     const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
     const accessToken = useSelector((state) => state.user.accessToken);
     const refreshToken = useSelector((state) => state.user.refreshToken);
     const dispatch = useDispatch();
     const [data, setData] = useState("");

     const navigate = useNavigate();

     const toastifyOptions = {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
     };

     const fetchData = async (accessToken) => {
          const url = "http://localhost:5000/private/private1";
          const res = await fetch(url, {
               method: "GET",
               headers: {
                    'Authorization': `Bearer ${accessToken}`,
               },
          });
          const response = await res.json();
          if (response.statusCode !== 200) {
               const refreshTokenResponse = await generateAccessToken(refreshToken);
               if (refreshTokenResponse.statusCode !== 200) {
                    toast.error(response.error.message, toastifyOptions);
                    setTimeout(() => {
                         navigate("/login");
                    }, 1000);
               } else {
                    localStorage.setItem("accessToken", refreshTokenResponse.data);
                    dispatch(userActions.refreshAccessToken(refreshTokenResponse.data));
               }
          } else {
               dispatch(userActions.login({ accessToken:accessToken , refreshToken: refreshToken }))
               setData(response.data);
          }
     };

     const checkUserLogin = () => {
          if (!isLoggedIn) {
               navigate("/login");
          }
     };

     useEffect(() => {
          if (isLoggedIn) {
               fetchData(accessToken);
          }
     }, [accessToken]);

     useEffect(() => {
          checkUserLogin();
     }, []);


     return (
          <div>
               <h1 className="homepage-title">{data}</h1>;
               <ToastContainer />
          </div>
     );
};

export default PrivateComponent;
