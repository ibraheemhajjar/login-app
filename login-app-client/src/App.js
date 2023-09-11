import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import NavBar from "./components/nav-bar/Nav-Bar";
import Homepage from "./components/homepage/Homepage";
import Signup from "./components/signup/Signup";
import PrivateComponent from "./components/private-component/PrivateComponent";

function App() {
     return (
          <BrowserRouter>
               <NavBar />
               <div className="container">
                    <Routes>
                         <Route path="/">
                              <Route path="/" element={<Homepage />} />
                              <Route path="/login" element={<Login />} />
                              <Route path="/signup" element={<Signup />} />
                              <Route path="/private" element={<PrivateComponent />} />
                         </Route>
                    </Routes>
               </div>
          </BrowserRouter>
     );
}

export default App;
