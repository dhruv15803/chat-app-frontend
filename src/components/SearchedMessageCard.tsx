import { message } from "@/types";
import React from "react";
import { SheetClose } from "./ui/sheet";

type SearchedMessageCardProps = {
  message: message;
  goToSearchedMessage: (id: string) => void;
};

const SearchedMessageCard = ({
  message,
  goToSearchedMessage,
}: SearchedMessageCardProps) => {
  function convertTo24HourFormat(timestamp: string): string {
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  }

  const convertToDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    console.log(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <SheetClose asChild>
        <div
          onClick={() => goToSearchedMessage(message._id)}
          className="cursor-pointer flex flex-col p-2 justify-center border-b-2 hover:bg-blue-100"
        >
          <div className="flex items-center gap-4">
            <div className="flex flex-wrap w-[70%]">{message.message}</div>
            <div>{convertTo24HourFormat(message.createdAt)}</div>
          </div>
          <div className="font-semibold mt-2">
            {convertToDate(message.createdAt)}
          </div>
        </div>
      </SheetClose>
    </>
  );
};

export default SearchedMessageCard;
