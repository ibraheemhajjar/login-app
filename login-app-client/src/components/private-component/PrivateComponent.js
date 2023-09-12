import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import generateAccessToken from "../../helpers/generateAccessToken";
import { toast, ToastContainer } from "react-toastify";
import { userActions } from "../../store";

const PrivateComponent = () => {
     const accessToken = useSelector((state) => state.user.accessToken);
     const refreshToken = useSelector((state) => state.user.refreshToken);
     const dispatch = useDispatch();
     const [data, setData] = useState("");

     const navigate = useNavigate();

     const fetchData = async (accessToken) => {
          const url = "http://localhost:5000/private/private1";
          const res = await fetch(url, {
               method: "GET",
               headers: {
                    Authorization: `Bearer ${accessToken}`,
               },
          });
          const response = await res.json();
          if (response.statusCode === 200) {
               dispatch(userActions.login());
               setData(response.data);
               return;
          }
          const refreshTokenResponse = await generateAccessToken(refreshToken);
          if (refreshTokenResponse.statusCode === 200) {
               localStorage.setItem("accessToken", refreshTokenResponse.data);
               dispatch(userActions.login());
               dispatch(userActions.setAccessToken(refreshTokenResponse.data));
          } else {
               navigate("/login");
          }
     };

     useEffect(() => {
          fetchData(accessToken);
     }, [accessToken]);

     return (
          <div>
               <h1 className="homepage-title">{data}</h1>;
               <ToastContainer />
          </div>
     );
};

export default PrivateComponent;
