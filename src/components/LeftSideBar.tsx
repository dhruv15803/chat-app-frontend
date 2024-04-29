import { User } from "@/types";
import React, { useState } from "react";
import UserCard from "./UserCard";
import { Button } from "./ui/button";
import { toast } from "sonner";

type LeftSideBarProps = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const LeftSideBar = ({
  users,
  selectedUser,
  setSelectedUser,
}: LeftSideBarProps) => {

  const [searchUsername,setSearchUsername] = useState<string>("");

  const searchUser = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(searchUsername.trim()==="") {
      toast.error("Please enter the required field");
      return;
    }
    const user = users.find((user) => user.username===searchUsername.trim().toLowerCase());
    if(!user) {
      toast.error("User not found");
      return;
    }
    setSelectedUser(user!);
  }
  return (
    <>
      <div className="border-2 w-[30%] md:w-[40%] flex flex-col overflow-y-auto">
        <div className="mt-4 border-b-2 flex items-center justify-center p-4">
          <form onSubmit={(e) => searchUser(e)} className="flex items-center gap-2">
            <input
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              className="border-2 rounded-lg p-2"
              type="text"
              name="searchUsername"
              id="searchUsername"
              placeholder="Enter username"
            />
            <Button
              variant="outline"
              className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
            >
              Search
            </Button>
          </form>
        </div>
        {users?.map((user) => {
          return (
            <UserCard
              key={user._id}
              selectedUser={selectedUser!}
              setSelectedUser={setSelectedUser}
              user={user}
            />
          );
        })}
      </div>
    </>
  );
};

export default LeftSideBar;
