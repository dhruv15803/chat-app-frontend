import { GlobalContext, backendUrl } from "@/App";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GlobalContextType } from "@/types";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [loginErrorMsg,setLoginErrorMsg] = useState<string>(""); 
  const {setLoggedInUser,setIsLoggedIn}:GlobalContextType = useContext(GlobalContext);


  const loginUser = async (e:React.FormEvent<HTMLFormElement>) => {
    try {
        e.preventDefault();
        if(email.trim()==="" || password.trim()===""){
            setLoginErrorMsg("Please enter the required fields");
            setTimeout(() => {
                setLoginErrorMsg("");
            },4000)
            return;
        }
    
        // POST API call to login
        const response = await axios.post(`${backendUrl}/api/auth/login`,{
            email,
            password,
        },{withCredentials:true});
        console.log(response);
        setLoggedInUser(response.data.user);
        setIsLoggedIn(true);
    } catch (error:any) {
        setLoginErrorMsg(error.response.data.message);
        setTimeout(() => {
          setLoginErrorMsg("");
        },4000)
        console.log(error);
    }
  }


  return (
    <>
      <div className="border-2 rounded-lg shadow-lg my-10 w-[80%] md:w-[50%] mx-auto p-4">
        <div className="text-2xl flex justify-center items-center font-semibold">
          Login
        </div>
        <form onSubmit={(e) => loginUser(e)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 rounded-lg p-2"
              type="email"
              name="email"
              id="email"
              placeholder="eg:test@test.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-lg p-2"
              type={isShowPassword ? "text" : "password"}
              name="password"
              id="password"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isShowPassword}
              onClick={() => setIsShowPassword(!isShowPassword)}
            />
            <label htmlFor="isShowPassword">show password</label>
          </div>
          <div className="text-red-500">
            {loginErrorMsg}
          </div>
          <div className="flex items-center gap-1">
            <span>Don't have an account?</span>
            <Link className="font-semibold text-blue-500" to="/register">
              Click here to register
            </Link>
          </div>
          <Button>Login</Button>
        </form>
      </div>
    </>
  );
};

export default Login;
