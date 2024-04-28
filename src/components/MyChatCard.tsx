import { message } from "@/types";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import EditDialog from "./EditDialog";
import MessageDropDown from "./MessageDropDown";

type MyChatCardProps = {
  message: message;
  convertTo24HourFormat: (timestamp: string) => string;
  deleteMessage: (messageId: string) => Promise<void>;
  editMessage: (messageId: string, newMessage: string) => Promise<void>;
  searchedMessageRef:React.RefObject<HTMLDivElement>;
  searchedMessageId:string;
};

const MyChatCard = ({
  message,
  convertTo24HourFormat,
  deleteMessage,
  editMessage,
  searchedMessageRef,
  searchedMessageId,
}: MyChatCardProps) => {
  const [isArrowShow, setIsArrowShow] = useState<boolean>(false);
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <EditDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        message={message}
        editMessage={editMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        setIsShowDropdown={setIsShowDropdown}
      />
      <div ref={searchedMessageId===message._id ? searchedMessageRef : null} className="flex flex-col gap-1">
        <div className="flex justify-end">
          <div className="flex w-[60%] justify-end">
            <div
              onMouseEnter={() => setIsArrowShow(true)}
              onMouseLeave={() => setIsArrowShow(false)}
              className="flex flex-col bg-blue-100 p-2 rounded-lg"
            >
              <div className="flex flex-wrap"> {message.message}</div>
              <div className="flex items-center justify-between">
                <span>{convertTo24HourFormat(message.createdAt)}</span>
                {isArrowShow &&
                  (isShowDropdown ? (
                    <IoIosArrowUp onClick={() => setIsShowDropdown(false)} />
                  ) : (
                    <IoIosArrowDown onClick={() => setIsShowDropdown(true)} />
                  ))}
              </div>
            </div>
          </div>
        </div>
        {isShowDropdown && (
            <div className="flex justify-end">
            <MessageDropDown 
            deleteMessage={deleteMessage} 
            setIsShowDropdown={setIsShowDropdown} 
            message={message}
            setIsDialogOpen={setIsDialogOpen}
            setNewMessage={setNewMessage}
            />
            </div>
        )}
      </div>
    </>
  );
};

export default MyChatCard;