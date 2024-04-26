import { User } from "@/types";
import React from "react";
import UserCard from "./UserCard";
import { Button } from "./ui/button";

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
  return (
    <>
      <div className="border-2 w-[30%] flex flex-col">
        <div className="mt-4 border-b-2 flex items-center justify-center p-4">
          <form className="flex items-center gap-2">
            <input
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
              selectedUser={selectedUser}
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