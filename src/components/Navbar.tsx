import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { GlobalContext, backendUrl } from "@/App";
import { GlobalContextType } from "@/types";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";

const Navbar = () => {
    const {loggedInUser,setLoggedInUser,isLoggedIn,setIsLoggedIn}:GlobalContextType = useContext(GlobalContext);
    const navigate = useNavigate();

    const logoutUser = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/auth/logout`,{
                withCredentials:true,
            });
            console.log(response);
            setLoggedInUser({});
            setIsLoggedIn(false);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
      <nav className="flex items-center p-4 justify-between border-b-2">
        <div className="text-blue-500 text-3xl font-semibold">
          <Link to="/">ChatDot</Link>
        </div>
        {isLoggedIn ? <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
                {loggedInUser?.avatar!=="" ? <>
                <img className="rounded-full w-16 h-14 bg-cover" src={loggedInUser?.avatar} alt="" />
                </> : <span className="text-2xl"><RxAvatar/></span>}
                <span className="text-lg font-semibold">{loggedInUser?.username}</span>
            </div>
            <Button onClick={logoutUser} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">Logout</Button>
        </div> : <div className="flex items-center">
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
          >
            Login
          </Button>
        </div>}
      </nav>
    </>
  );
};

export default Navbar;
