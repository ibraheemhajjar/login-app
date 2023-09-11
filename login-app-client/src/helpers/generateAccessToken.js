const generateAccessToken = async (refreshToken) => {
     const url = "http://localhost:5000/auth/refresh";

     const res = await fetch(url, {
          method: "GET",
          headers: {
               Authorization: `Bearer ${refreshToken}`,
          },
     });

     const response = await res.json();

     if (response.statusCode === 200) {
          return response;
     } else {
          return "not Authenticated";
     }
};

export default generateAccessToken;
