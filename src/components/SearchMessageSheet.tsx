import { useEffect, useState } from "react";
import {
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
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
  const [date, setDate] = useState<Date>();

  const searchConversationForMessage = () => {
    setDate(undefined);
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
    if(date===undefined) return;
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
      return;
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  console.log(date);

  useEffect(() => {
    if (date === undefined) {
      setFilteredMessages([]);
      return
    };
    filterByDate();
  }, [date]);

  useEffect(() => {
    if (searchMessage.trim() === "") {
      setFilteredMessages([]);
      return
    };
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
        {searchMessage.trim().length < 2 && date===undefined && filteredMessages.length===0 && <>
        <div>Search messages with {selectedUser.username}</div>
        </>}
        {searchMessage.trim()==="" && date!==undefined && filteredMessages.length===0 && <>
        <div>No messages found on {convertToDateFromDate(date)}</div>
        </>}
        {date===undefined && searchMessage.trim().length >=2 && filteredMessages.length===0 && <>
        <div>No messages found with {searchMessage.trim()}</div>
        </>}
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