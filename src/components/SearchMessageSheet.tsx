import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { User, message } from "@/types";
import SearchedMessageCard from "./SearchedMessageCard";

type SearchMessageSheetProps = {
  messages: message[];
  selectedUser: User;
  goToSearchedMessage:(id:string) => void;
};

const SearchMessageSheet = ({
  messages,
  selectedUser,
  goToSearchedMessage,
}: SearchMessageSheetProps) => {
  const [searchMessage, setSearchMessage] = useState<string>("");
  const [filteredMessages, setFilteredMessages] = useState<message[]>([]);

  //   searchMessage is can be a substring of a message
  // so there can be multiple messages with this particular substring.

  const searchConversationForMessage = () => {
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

  console.log("Filtered messages ", filteredMessages);

  useEffect(() => {
    searchConversationForMessage();
  }, [searchMessage]);

  return (
    <>
      <SheetContent>
        <SheetHeader className="text-xl font-semibold">
          Search message
        </SheetHeader>
        <Separator />
        <form className="flex items-center my-4 gap-4">
          <input
            value={searchMessage}
            onChange={(e) => setSearchMessage(e.target.value)}
            className="border-2 min-w-full rounded-lg p-2"
            type="text"
            name="searchMessage"
            id="searchMessage"
          />
        </form>
        {filteredMessages.length === 0 && searchMessage.trim() !== "" && (
          <div className="">No messages found</div>
        )}
        {filteredMessages.length === 0 && searchMessage.trim() === "" && (
          <div>Search for messages with {selectedUser?.username}</div>
        )}
        {filteredMessages?.map((message) => {
          return <SearchedMessageCard goToSearchedMessage={goToSearchedMessage} key={message._id} message={message} />;
        })}
      </SheetContent>
    </>
  );
};

export default SearchMessageSheet;
