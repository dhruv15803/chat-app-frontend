import React, { useEffect, useState } from "react";
import { SheetContent, SheetFooter, SheetHeader } from "./ui/sheet";
import { User, message } from "@/types";
import UserCard from "./UserCard";
import ForwardUserCard from "./ForwardUserCard";
import { backendUrl } from "@/App";
import axios from "axios";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";


type ForwardMessageSheetProps = {
    message:message;
    forwardMessage:(message:message,selectForwardUser:User) => Promise<void>;
}

const ForwardMessageSheet = ({message,forwardMessage}:ForwardMessageSheetProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectForwardUser, setSelectForwardUser] = useState<null | User>(null);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/getAllUsers`, {
        withCredentials: true,
      });
      console.log(response);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <SheetContent>
        <SheetHeader className="text-xl font-semibold">
          Select user to forward message
        </SheetHeader>
        <Separator/>
        {users?.map((user) => {
          return (
            <ForwardUserCard
              key={user._id}
              user={user}
              selectForwardUser={selectForwardUser}
              setSelectForwardUser={setSelectForwardUser}
            />
          );
        })}
        {selectForwardUser!==null && <SheetFooter className="my-4">
            <Button onClick={() => forwardMessage(message,selectForwardUser)}>Forward</Button>
        </SheetFooter>}
      </SheetContent>
    </>
  );
};

export default ForwardMessageSheet;
