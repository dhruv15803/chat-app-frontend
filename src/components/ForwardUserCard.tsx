import { User } from "@/types";
import React, { SetStateAction, useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { Checkbox } from "./ui/checkbox";

type ForwardUserCardProps = {
  user: User;
  forwardUsers:string[];
  setForwardUsers:React.Dispatch<SetStateAction<string[]>>;
};

const ForwardUserCard = ({
  user,
  forwardUsers,
  setForwardUsers,
}: ForwardUserCardProps) => {

  const [isChecked,setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if(isChecked) {
      setForwardUsers(prevUsers => [...prevUsers,user._id]);
    } else {
      const newForwardUsers = forwardUsers.filter((id) => user._id!==id);
      setForwardUsers(newForwardUsers);
    }
  },[isChecked])

  return (
    <div
      className="cursor-pointer flex items-center p-4 gap-2 border-b-2"
    >
      <Checkbox onClick={() => setIsChecked(!isChecked)} checked={isChecked}/>
      <div>
        {user.avatar !== "" ? (
          <div className="text-xl">
            <img className="w-12 h-12 rounded-full" src={user.avatar} alt="" />
          </div>
        ) : (
          <div className="text-3xl">
            <RxAvatar />
          </div>
        )}
      </div>
      <div className="text-xl font-semibold">{user?.username}</div>
    </div>
  );
};

export default ForwardUserCard;
