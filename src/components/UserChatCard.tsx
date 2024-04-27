import { message } from "@/types";
import React from "react";

type UserChatCardProps = {
    message:message;
    convertTo24HourFormat:(timestamp:string) => string;
}

const UserChatCard = ({message,convertTo24HourFormat}:UserChatCardProps) => {
  return (
    <>
      <div className="flex">
        <div className="flex w-[60%]">
          <div className="flex flex-col bg-green-100 rounded-lg p-2">
            <div className="flex flex-wrap">{message.message}</div>
            <div className="text-sm font-extralight mt-1">
              {convertTo24HourFormat(message.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChatCard;
