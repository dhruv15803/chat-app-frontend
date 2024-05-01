import { backendUrl } from "@/App";
import LeftSideBar from "@/components/LeftSideBar";
import RightChatSection from "@/components/RightChatSection";
import {  Group, User } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isShowUsers, setIsShowUsers] = useState(true);

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

  // gets all groups that logged in user is a part of
  const getMyGroups = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/group/getMyGroups`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setGroups(response.data.groups);
      } else {
        setGroups([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
    getMyGroups();
  }, []);

  return (
    <>
      <div className=" w-[90%] mx-auto border-2 rounded-lg shadow-lg flex h-[600px] my-14">
        <LeftSideBar
          isShowUsers={isShowUsers}
          setIsShowUsers={setIsShowUsers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          users={users}
          groups={groups}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
        <RightChatSection
          isShowUsers={isShowUsers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      </div>
    </>
  );
};

export default Home;
