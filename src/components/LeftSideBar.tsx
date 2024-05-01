import { Group, User } from "@/types";
import React, { SetStateAction, useEffect, useState } from "react";
import UserCard from "./UserCard";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Sheet,SheetTrigger } from "./ui/sheet";
import CreateGroupSheet from "./CreateGroupSheet";
import GroupCard from "./GroupCard";

type LeftSideBarProps = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  groups: Group[];
  selectedGroup: Group | null;
  setSelectedGroup: React.Dispatch<SetStateAction<Group | null>>;
  isShowUsers:boolean;
  setIsShowUsers:React.Dispatch<SetStateAction<boolean>>;
};

const LeftSideBar = ({
  users,
  selectedUser,
  setSelectedUser,
  groups,
  setSelectedGroup,
  selectedGroup,
  isShowUsers,
}: LeftSideBarProps) => {
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [searchGroupName,setSearchGroupName] = useState<string>("");
  const [filteredUsers,setFilteredUsers] = useState<User[]>([]);

  const searchUser = () => {
    if (searchUsername.trim() === "") {
      setFilteredUsers([]);
      return;
    }
    let filtered = [];
    for(let i=users.length-1;i>=0;i--) {
      if(users[i].username.includes(searchUsername.trim().toLowerCase())) {
        filtered.push(users[i]);
      }
    }

    if (filtered.length===0) {
      return;
    }
    setFilteredUsers(filtered);
  };
  
  
  const searchGroup = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(searchGroupName.trim()==="") {
      toast.error("Please enter the required fields");
      return;
    }
    const group = groups.find((group) => group.groupName===searchGroupName.trim().toLowerCase());
    if(!group) {
      toast.error("Group not found");
      return;
    }
    setSelectedGroup(group);
  }

  console.log('Filtered', filteredUsers);

  useEffect(() => {
    searchUser();
  },[searchUsername])

  return (
    <>
      <div className="border-2 w-[30%] md:w-[40%] flex flex-col overflow-y-auto">
        {isShowUsers ? (
          <>
            <div className="text-xl flex items-center justify-end p-2">
              <Sheet>
                <SheetTrigger>
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
                  >
                    New group
                  </Button>
                </SheetTrigger>
                <CreateGroupSheet />
              </Sheet>
            </div>
            <div className="mt-4 border-b-2 flex items-center justify-center p-4 gap-2">
              {/* <form
                onSubmit={(e) => searchUser(e)}
                className="flex items-center gap-2"
              > */}
                <input
                  value={searchUsername}
                  onChange={(e) => setSearchUsername(e.target.value)}
                  className="border-2 rounded-lg p-2"
                  type="text"
                  name="searchUsername"
                  id="searchUsername"
                  placeholder="Enter username"
                />
                {searchUsername.trim()!=="" && <Button onClick={() => {
                  setFilteredUsers(users);
                  setSearchUsername("");
                }}  variant="outline"
                  className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">Clear</Button>}
                {/* <Button
                  variant="outline"
                  className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
                >
                  Search
                </Button> */}
              {/* </form> */}
            </div>
            {filteredUsers.length!==0 ? <>
            {filteredUsers?.map((user) => {
               return (
                <UserCard
                  key={user._id}
                  selectedUser={selectedUser!}
                  setSelectedUser={setSelectedUser}
                  user={user}
                />
              );
            })}
            </> : <>
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
            </>}
          </>
        ) : (
          <>
            <div className="m-4 text-xl font-semibold">My groups</div>
            <form onSubmit={(e) => searchGroup(e)} className="flex justify-center items-center border-b-2 p-2 gap-2">
              <input
                className="border-2 rounded-lg p-2"
                type="text"
                value={searchGroupName}
                onChange={(e) => setSearchGroupName(e.target.value)}
                name="searchGroupName"
                id="searchGroupName"
                placeholder="Enter group name"
              />
              <Button
                variant="outline"
                className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
              >
                Search
              </Button>
            </form>
            {groups?.map((group) => {
              return (
                <GroupCard
                  key={group._id}
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                  group={group}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default LeftSideBar;
