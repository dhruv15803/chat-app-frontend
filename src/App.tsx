import { BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom"
import Layout from "./Layouts/Layout"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { User } from "./types";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const backendUrl="http://localhost:5000";
export const GlobalContext = createContext(null);


function App() {
  const [loggedInUser,setLoggedInUser] = useState<User | {}>({});
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);

  const getLoggedInUser = async () => {
    try {
      if(isLoggedIn) return;
      const response = await axios.get(`${backendUrl}/api/user/getLoggedInUser`,{
        withCredentials:true,
      });
      
      if(response.data.success) {
        setLoggedInUser(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(() => {
    getLoggedInUser();
  },[])

  return (
    <>
    <GlobalContext.Provider value={{
      loggedInUser,
      setLoggedInUser,
      isLoggedIn,
      setIsLoggedIn,
    }}>
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<>Home</>}/>
          <Route path="login" element={isLoggedIn ? <Navigate to='/'/> : <Login/>}/>
          <Route path="register" element={isLoggedIn ? <Navigate to='/'/> : <Register/>}/>
        </Route>
      </Routes>
    </Router>
    </GlobalContext.Provider>
    </>
  )
}

export default App
