import { GlobalContext, backendUrl } from "@/App";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GlobalContextType } from "@/types";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<string | File>("");
  const [avatarUrl,setAvatarUrl] = useState<string>("");
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [registerErrorMsg,setRegisterErrorMsg] = useState<string>("");
  const {setLoggedInUser,setIsLoggedIn}:GlobalContextType = useContext(GlobalContext);

  const getAvatarFile = async () => {
    try {
        if(typeof avatarFile==="string") return;
        // API CALL using axios
        setIsLoading(true);
        const response = await axios.post(`${backendUrl}/api/user/getAvatarUrl`,{
            "avatar":avatarFile,
        },{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        console.log(response);
        setAvatarUrl(response.data.url);
    } catch (error) {
        console.log(error);
    } finally{
        setIsLoading(false);
    }
  }

  const registerUser = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        if(email.trim()==="" || username.trim()==="" || password.trim()==="" || confirmPassword.trim()==="") {
            setRegisterErrorMsg("Please enter the required fields");
            setTimeout(() => {
                setRegisterErrorMsg("");
            },4000)
            return;
        }
        if(password!==confirmPassword){
            setRegisterErrorMsg("passwords do not match!");
            setTimeout(() => {
                setRegisterErrorMsg("");
            },4000)
            return;
        }

        // POST API CALL/REQ TO REGISTER USER
        const response = await axios.post(`${backendUrl}/api/auth/register`,{
            email,
            password,
            username,
            avatarUrl,
        },{withCredentials:true});

        console.log(response);
        setLoggedInUser(response.data.newUser);
        setIsLoggedIn(true);
        setAvatarFile("");
        setAvatarUrl("");
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setIsShowPassword(false);
    } catch (error:any) {
        console.log(error);
        setRegisterErrorMsg(error.response.data.message);
        setTimeout(() => {
            setRegisterErrorMsg("");
        },4000)
    }
  }

  useEffect(() => {
    getAvatarFile();
  },[avatarFile])

  return (
    <>
      <div className="border-2 rounded-lg p-4 shadow-lg my-10 w-[80%] md:w-[50%] mx-auto">
        <div className="text-2xl font-semibold flex justify-center items-center">
          Register
        </div>
        {isLoading && <>
        <div className="flex items-center justify-center gap-4 my-2">
            <Loader height="80" width="80"/>
            <span className="text-blue-500 font-semibold">Loading...</span>
        </div>
        </>}
        {(avatarUrl!=="" && isLoading===false) &&  <div className="flex items-center justify-center my-2">
            <img className="rounded-full w-24 bg-cover" src={avatarUrl} alt="user-avatar"/>
        </div>}
        <form onSubmit={(e) => registerUser(e)} className="flex flex-col gap-4">  
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 rounded-lg p-2"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 rounded-lg p-2"
              type="text"
              name="username"
              id="username"
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
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-2 rounded-lg p-2"
              type={isShowPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              className="text-blue-500 hover:underline hover:underline-offset-4 w-fit"
              htmlFor="avatarFile"
            >
                {avatarUrl!=="" ? 'Change avatar' : 'upload avatar'}
            </label>
            {avatarUrl!=="" && <Button onClick={() => {
                setAvatarUrl("");
                setAvatarFile("");
            }} className="text-blue-500" variant="ghost">Remove avatar</Button>}
            <input hidden onChange={(e) => setAvatarFile(e.target.files![0])} type="file" name="avatarFile" id="avatarFile" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isShowPassword}
              onClick={() => setIsShowPassword(!isShowPassword)}
            />
            <label htmlFor="isShowPassword">show password</label>
          </div>
          <div className="text-red-500">
            {registerErrorMsg}
          </div>
          <div className="flex items-center gap-1">
            <span>Already have an account?</span>
            <Link className="font-semibold text-blue-500" to="/login">
              Click here to login
            </Link>
          </div>
          <Button>Register</Button>
        </form>
      </div>
    </>
  );
};

export default Register;
