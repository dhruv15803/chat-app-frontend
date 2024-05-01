import {  User, message } from "@/types";
import React, { useState } from "react";
import { IoCaretForward } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import ForwardMessageSheet from "./ForwardMessageSheet";

type UserChatCardProps = {
  message: message;
  convertTo24HourFormat: (timestamp: string) => string;
  searchedMessageId: string;
  searchedMessageRef: React.RefObject<HTMLDivElement>;
  isForwarded: boolean;
  forwardMessage:(message:message,forwardUsers:string[]) => Promise<void>;
  selectedUser:User | null;
};

const UserChatCard = ({
  message,
  convertTo24HourFormat,
  searchedMessageId,
  searchedMessageRef,
  isForwarded,
  forwardMessage,
  selectedUser,
}: UserChatCardProps) => {
  const [isArrowShow, setIsArrowShow] = useState<boolean>(false);
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);

  return (
    <>
      <div
        ref={message._id === searchedMessageId ? searchedMessageRef : null}
        className="flex flex-col gap-1"
      >
        <div className="flex  w-[60%]">
          <div
            onMouseEnter={() => setIsArrowShow(true)}
            onMouseLeave={() => setIsArrowShow(false)}
            className="flex flex-col bg-green-100 rounded-lg p-2"
          >
            {isForwarded && (
              <div className="flex items-center font-extralight text-sm">
                <IoCaretForward />
                <span>Forwarded</span>
              </div>
            )}
            <div className="flex flex-wrap">{message.message}</div>
            <div className="flex items-center justify-between text-sm font-extralight mt-1">
              {convertTo24HourFormat(message.createdAt)}
              {isArrowShow && (
                <>
                  {isShowDropdown ? (
                    <IoIosArrowUp onClick={() => setIsShowDropdown(false)} />
                  ) : (
                    <IoIosArrowDown onClick={() => setIsShowDropdown(true)} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {isShowDropdown && <>
          <div className="flex flex-col gap-2 w-[25%]">
            <Sheet>
              <SheetTrigger><Button variant="outline" className="w-full">Forward</Button></SheetTrigger>
              <ForwardMessageSheet selectedUser={selectedUser} message={message} forwardMessage={forwardMessage}/>
            </Sheet>
          </div>
          </>}
      </div>
    </>
  );
};

export default UserChatCard;
