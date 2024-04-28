import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { GlobalContextType, User, message } from "@/types";
import axios from "axios";
import { GlobalContext, backendUrl } from "@/App";
import { RxAvatar } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import MyChatCard from "./MyChatCard";
import UserChatCard from "./UserChatCard";
import { CiSearch } from "react-icons/ci";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SearchMessageSheet from "./SearchMessageSheet";

type RightChatSectionProps = {
  selectedUser: User | null;
  setSelectedUser:React.Dispatch<SetStateAction<User | null>>;
};

const RightChatSection = ({ selectedUser,setSelectedUser }: RightChatSectionProps) => {
  const [messages, setMessages] = useState<message[]>([]);
  const [message, setMessage] = useState<string>("");
  const { loggedInUser }: GlobalContextType = useContext(GlobalContext);
  const [noMessagesMsg, setNoMessagesMsg] = useState<string>("");
  const searchedMessageRef = useRef<HTMLDivElement>(null);
  const [searchedMessageId, setSearchedMessageId] = useState<string>("");
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const previousMessagesLength = useRef(0);

  const getConversation = async () => {
    try {
      if (selectedUser === null) {
        return;
      }
      const response = await axios.get(
        `${backendUrl}/api/message/getConversation/${selectedUser._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        setMessages(response.data.conversationMessages);
      } else {
        setNoMessagesMsg(response.data.message);
        setMessages([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (message.trim() === "") return;
      // POST API REQ
      const response = await axios.post(
        `${backendUrl}/api/message/create`,
        {
          senderId: loggedInUser._id,
          receiverId: selectedUser?._id,
          message: message,
        },
        { withCredentials: true }
      );
      console.log(response);
      setMessages((prevMessages) => [
        ...prevMessages,
        response.data.sentMessage,
      ]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/message/deleteMessage/${selectedUser?._id}/${messageId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      const newMessages = messages.filter(
        (message) => message._id !== messageId
      );
      setMessages(newMessages);
    } catch (error) {
      console.log(error);
    }
  };

  const editMessage = async (messageId: string, newMessage: string) => {
    try {
      if (newMessage.trim() === "") return;

      
      const response = await axios.put(
        `${backendUrl}/api/message/editMessage`,
        {
          messageId,
          newMessage,
          receiverId: selectedUser?._id,
        },
        { withCredentials: true }
      );
      console.log(response);
      const newMessages = messages?.map((message) => {
        if (message._id === messageId) {
          return {
            ...message,
            message: newMessage,
          };
        } else {
          return message;
        }
      });
      setMessages(newMessages);
    } catch (error) {
      console.log(error);
    }
  };

  const forwardMessage = async (message:message,selectForwardUser:User) => {
    try {
      if(message.message.trim()==="") {
        return;
      }
      const response = await axios.post(`${backendUrl}/api/message/forward`,{
        "message":message.message,
        "receiverId":selectForwardUser._id,
      },{withCredentials:true});
      console.log(response);
      setSelectedUser(selectForwardUser);
    } catch (error) {
      console.log(error);
    }
  } 

  function convertTo24HourFormat(timestamp: string) {
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  }

  const goToSearchedMessage = (id: string) => setSearchedMessageId(id);

  useEffect(() => {
    const scrollToMessage = () => {
      if (searchedMessageRef.current) {
        searchedMessageRef.current.scrollIntoView({behavior:"smooth"})
      }
    }
    scrollToMessage();
  },[searchedMessageId])

  useEffect(() => {
    const scrollToLatestMessage = () => {
      if(latestMessageRef.current && messages.length > previousMessagesLength.current) {
        latestMessageRef.current.scrollIntoView({behavior:'smooth'})
      }
    }
    scrollToLatestMessage();
    previousMessagesLength.current = messages.length;
  },[messages])

  useEffect(() => {
    getConversation();

    const intervalId = setInterval(() => {
      getConversation();
    }, 5000);

    // Cleanup function to clear the interval when component unmounts or selectedUser changes
    return () => clearInterval(intervalId);
  }, [selectedUser]);

  if (selectedUser === null) {
    return (
      <>
        <div className="border-2 w-[70%] flex flex-col justify-center items-center">
          <div className="text-2xl font-semibold">
            {" "}
            Please select a user you want to chat with
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="border-2 w-[70%] flex flex-col">
        <div className="flex items-center text-xl font-semibold p-2 border-b-2 justify-between">
          {selectedUser.username}
          <Sheet>
            <SheetTrigger className="text-2xl">
              <CiSearch />
            </SheetTrigger>
            <SearchMessageSheet
              goToSearchedMessage={goToSearchedMessage}
              selectedUser={selectedUser}
              messages={messages}
            />
          </Sheet>
        </div>
        <div className="flex flex-col gap-4 h-[85%] p-2 border-2 overflow-y-auto">
          {messages?.map((message) => {
            if (message.senderId === loggedInUser._id) {
              return (
                <MyChatCard
                  forwardMessage={forwardMessage}
                  latestMessageRef={latestMessageRef}
                  searchedMessageId={searchedMessageId}
                  searchedMessageRef={searchedMessageRef}
                  deleteMessage={deleteMessage}
                  editMessage={editMessage}
                  key={message._id}
                  message={message}
                  convertTo24HourFormat={convertTo24HourFormat}
                />
              );
            } else {
              return (
                <UserChatCard
                  isForwarded={message.isForwarded}
                  searchedMessageId={searchedMessageId}
                  searchedMessageRef={searchedMessageRef}
                  key={message._id}
                  message={message}
                  convertTo24HourFormat={convertTo24HourFormat}
                />
              );
            }
          })}
        </div>
        <form
          onSubmit={(e) => sendMessage(e)}
          className="flex items-center gap-2"
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 rounded-lg p-2 w-[70%]"
            type="text"
            name="message"
            id="message"
            placeholder="Enter message"
          />
          <Button>Send</Button>
        </form>
      </div>
    </>
  );
};

export default RightChatSection;
