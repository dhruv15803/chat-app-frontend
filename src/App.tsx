import { BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom"
import Layout from "./Layouts/Layout"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { User } from "./types";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Home from "./Pages/Home";
import Loader from "./components/Loader";
export const backendUrl="http://localhost:5000";
export const GlobalContext = createContext(null);


function App() {
  const [loggedInUser,setLoggedInUser] = useState<User | {}>({});
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);
  const [isLoading,setIsLoading] = useState<boolean>(false);

  const getLoggedInUser = async () => {
    try {
      if(isLoggedIn) return;
      setIsLoading(true);
      const response = await axios.get(`${backendUrl}/api/user/getLoggedInUser`,{
        withCredentials:true,
      });
      
      if(response.data.success) {
        setLoggedInUser(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  } 

  useEffect(() => {
    getLoggedInUser();
  },[])

  if(isLoading) {
    return (
      <>
      <div className="flex justify-center items-center my-24 gap-2">
        <Loader height="90" width="90"/>
        Loading...
      </div>
      </>
    )
  }

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
          <Route index element={isLoggedIn ? <Home/> : <Login/>}/>
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
