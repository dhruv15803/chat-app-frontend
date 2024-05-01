import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { User, message } from "@/types";
import SearchedMessageCard from "./SearchedMessageCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

type SearchMessageSheetProps = {
  messages: message[];
  selectedUser: User;
  goToSearchedMessage: (id: string) => void;
};

const SearchMessageSheet = ({
  messages,
  selectedUser,
  goToSearchedMessage,
}: SearchMessageSheetProps) => {
  const [searchMessage, setSearchMessage] = useState<string>("");
  const [filteredMessages, setFilteredMessages] = useState<message[]>([]);
  const [date, setDate] = useState<Date | null>(null);

  const searchConversationForMessage = () => {
    setDate(null);
    let filtered = [];
    if (searchMessage.length <= 1) {
      setFilteredMessages([]);
      return;
    }
    for (let i = messages?.length - 1; i >= 0; i--) {
      if (messages[i].message.includes(searchMessage)) {
        filtered.push(messages[i]);
      }
    }
    setFilteredMessages(filtered);
  };

  const convertToDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const filterByDate = () => {
    setSearchMessage("");
    if (date === null || date===undefined) {
      setDate(null);
      return;
    }
    let filtered = [];
    const day = date?.getDate();
    const month = date?.getMonth() + 1;
    const year = date?.getFullYear();
    const dateString = `${day}/${month}/${year}`;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (convertToDate(messages[i].createdAt) === dateString) {
        filtered.push(messages[i]);
      }
    }
    setFilteredMessages(filtered);
  };

  const convertToDateFromDate = (date: Date)=> {
    if(date===undefined) {
      setDate(null);
      return null;
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };


  useEffect(() => {
    if (date === null) return;
    filterByDate();
  }, [date]);

  useEffect(() => {
    if (searchMessage.trim() === "") return;
    searchConversationForMessage();
  }, [searchMessage]);

  return (
    <>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="text-xl font-semibold">
          Search message
        </SheetHeader>
        <Separator />
        <div className="flex items-center my-4 gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <input
            value={searchMessage}
            onChange={(e) => setSearchMessage(e.target.value)}
            className="border-2 rounded-lg p-2"
            type="text"
            name="searchMessage"
            id="searchMessage"
          />
        </div>
        {filteredMessages.length === 0 && searchMessage.trim() !== "" && (
          <div className="">No messages found</div>
        )}
        {filteredMessages.length === 0 && date !== null && date!==undefined && (
          <>
            <div>No messages found on {convertToDateFromDate(date)}</div>
          </>
        )}
        {filteredMessages.length === 0 &&
          searchMessage.trim() === "" &&
          date === null && (
            <div>Search for messages with {selectedUser?.username}</div>
          )}
        {filteredMessages?.map((message) => {
          return (
            <SearchedMessageCard
              goToSearchedMessage={goToSearchedMessage}
              key={message._id}
              message={message}
            />
          );
        })}
      </SheetContent>
    </>
  );
};

export default SearchMessageSheet;
