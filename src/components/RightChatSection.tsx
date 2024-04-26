import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { GlobalContextType, User, message } from "@/types";
import axios from "axios";
import { GlobalContext, backendUrl } from "@/App";

type RightChatSectionProps = {
  selectedUser: User | null;
};

const RightChatSection = ({ selectedUser }: RightChatSectionProps) => {
  const [messages, setMessages] = useState<message[]>([]);
  const [message, setMessage] = useState<string>("");
  const { loggedInUser }: GlobalContextType = useContext(GlobalContext);
  const [noMessagesMsg, setNoMessagesMsg] = useState<string>("");
  const [isIntitialFetch, setIsInitialFetch] = useState<boolean>(true);

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

  console.log(messages);

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
        <div className="flex items-center text-xl font-semibold p-2 border-b-2">
          {selectedUser.username}
        </div>
        <div className="flex flex-col gap-4 h-[85%] border-2">
            {messages?.map((message) => {
                if(message.senderId===loggedInUser._id) {
                    return <div key={message._id} className="flex justify-end">
                    <div className="flex flex-wrap w-fit p-1 border-2 border-red-500">
                      {message.message}
                    </div>
                  </div>
                } else {
                    return <div key={message._id} className="flex">
                    <div className="flex flex-wrap w-fit p-1 border-2 border-blue-500">
                      {message.message}
                    </div>
                  </div>
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
