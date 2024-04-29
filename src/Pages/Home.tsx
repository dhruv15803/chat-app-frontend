import { GlobalContext, backendUrl } from "@/App";
import LeftSideBar from "@/components/LeftSideBar";
import RightChatSection from "@/components/RightChatSection";
import { GlobalContextType, User } from "@/types";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { loggedInUser }: GlobalContextType = useContext(GlobalContext);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/getAllUsers`, {
        withCredentials: true,
      });
      console.log(response);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="border-2 rounded-lg w-[90%] shadow-lg mx-auto my-16 flex h-[700px]">
        <LeftSideBar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          users={users}
        />
        <RightChatSection selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      </div>
    </>
  );
};

export default Home;
