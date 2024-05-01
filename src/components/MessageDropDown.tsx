import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { message } from "@/types";
import { Sheet, SheetTrigger } from "./ui/sheet";
import ForwardMessageSheet from "./ForwardMessageSheet";

type MessageDropDownProps = {
  setIsShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMessage: (messageId: string) => Promise<void>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  message: message;
  forwardMessage:(message:message,forwardUsers:string[]) => Promise<void>;
};

const MessageDropDown = ({
  setIsShowDropdown,
  deleteMessage,
  setIsDialogOpen,
  setNewMessage,
  message,
  forwardMessage,
}: MessageDropDownProps) => {
  return (
    <>
      <div className="flex flex-col gap-2 border-2 rounded-lg p-2 w-[25%]">
        <div className="p-1 font-semibold">Message</div>
        <Separator />
        <div className="flex">
          <Button
            className="w-full"
            onClick={async () => {
              await deleteMessage(message._id);
              setIsShowDropdown(false);
            }}
            variant="ghost"
          >
            Delete
          </Button>
        </div>
        <div className="flex">
          <Button
            className="w-full"
            variant="ghost"
            onClick={async () => {
              setIsDialogOpen(true);
              setNewMessage(message.message);
            }}
          >
            Edit
          </Button>
        </div>
        <div className="flex">
          <Sheet>
            <SheetTrigger className="w-full">
              <Button className="w-full" variant="ghost">
                Forward
              </Button>
            </SheetTrigger>
            <ForwardMessageSheet forwardMessage={forwardMessage}  message={message}/>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default MessageDropDown;
