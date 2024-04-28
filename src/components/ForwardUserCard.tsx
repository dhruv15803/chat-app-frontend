import { User } from "@/types";
import React, { SetStateAction } from "react";
import { RxAvatar } from "react-icons/rx";

type ForwardUserCardProps = {
  user: User;
  setSelectForwardUser: React.Dispatch<SetStateAction<User | null>>;
  selectForwardUser: User | null;
};

const ForwardUserCard = ({
  user,
  setSelectForwardUser,
  selectForwardUser,
}: ForwardUserCardProps) => {
  return (
    <div
      onClick={() => setSelectForwardUser(user)}
      className={`cursor-pointer flex items-center p-4 gap-2 border-b-2 ${
        selectForwardUser?._id === user._id ? "bg-gray-100" : ""
      }`}
    >
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
