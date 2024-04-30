import { User } from "@/types";
import React, { SetStateAction, useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { Checkbox } from "./ui/checkbox";

type GroupUserCardProps = {
  user: User;
  groupUsers:String[],
  setGroupUsers:React.Dispatch<SetStateAction<String[]>>;
};

const GroupUserCard = ({ user,groupUsers,setGroupUsers }: GroupUserCardProps) => {

    const [isChecked,setIsChecked]  = useState<boolean>(false);



    useEffect(() => {
        if(isChecked) {
            // addUser
            setGroupUsers(prevUsers => [...prevUsers,user._id]);
        } else {
            // removeUser
            const newGroupUsers = groupUsers.filter((id) => id!==user._id);
            setGroupUsers(newGroupUsers);
        }
    },[isChecked])

  return (
    <>
      <div className="flex items-center p-4 gap-2 cursor-pointer border-b-2">
        <Checkbox checked={isChecked} onClick={() => setIsChecked(!isChecked)}/>
        {user?.avatar !== "" ? (
          <>
            <img className="w-12 h-12 rounded-full" src={user?.avatar} />
          </>
        ) : (
          <div className="text-3xl">
            <RxAvatar />
          </div>
        )}
        <div>{user?.username}</div>
      </div>
    </>
  );
};

export default GroupUserCard;
