import { User } from "@/types";
import React from "react";
import { RxAvatar } from "react-icons/rx";

type UserCardProps = {
  user: User;
  selectedUser:User,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserCard = ({ user ,selectedUser,setSelectedUser}: UserCardProps) => {
  return (
    <>
      <div onClick={() => setSelectedUser(user)} className={`cursor-pointer flex items-center p-2 gap-4 border-b-2 ${selectedUser?._id===user?._id && 'bg-gray-100'}`}>
        <div>
          {user?.avatar !== "" ? (
            <>
              <img className="w-12 h-12 rounded-full bg-cover" src={user?.avatar} alt="" />
            </>
          ) : (
            <>
              <div className="text-4xl">
                <RxAvatar />
              </div>
            </>
          )}
        </div>
        <div className="text-xl font-semibold">{user?.username}</div>
      </div>
    </>
  );
};

export default UserCard;
