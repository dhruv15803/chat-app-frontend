import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { GlobalContext, backendUrl } from "@/App";
import { GlobalContextType } from "@/types";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const Navbar = () => {
  const {
    loggedInUser,
    setLoggedInUser,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(GlobalContext) as GlobalContextType;
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(response);
      setLoggedInUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="flex items-center p-4 justify-between border-b-2">
        <div className="text-blue-500 text-3xl font-semibold">
          <Link to="/">ChatDot</Link>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              {loggedInUser?.avatar !== "" ? (
                <>
                  <img
                    className="rounded-full w-16 h-14 bg-cover"
                    src={loggedInUser?.avatar}
                    alt=""
                  />
                </>
              ) : (
                <span className="text-2xl">
                  <RxAvatar />
                </span>
              )}
              <span className="text-lg font-semibold">
                {loggedInUser?.username}
              </span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                {" "}
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
                >
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="font-semibold">
                  Are you sure you want to logout ?
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={logoutUser}>
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <div className="flex items-center">
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
            >
              Login
            </Button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
