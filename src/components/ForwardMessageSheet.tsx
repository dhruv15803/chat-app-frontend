import  { useEffect, useState } from "react";
import { SheetContent, SheetFooter, SheetHeader } from "./ui/sheet";
import { User, message } from "@/types";
import ForwardUserCard from "./ForwardUserCard";
import { backendUrl } from "@/App";
import axios from "axios";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";


type ForwardMessageSheetProps = {
    message:message;
    forwardMessage:(message:message,forwardUsers:string[]) => Promise<void>;
    selectedUser:User | null;
}

const ForwardMessageSheet = ({message,forwardMessage,selectedUser}:ForwardMessageSheetProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [forwardUsers,setForwardUsers] = useState<string[]>([]);

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
          if(user._id===selectedUser?._id) return <></>;
          return (
            <ForwardUserCard
              key={user._id}
              user={user}
              forwardUsers={forwardUsers}
              setForwardUsers={setForwardUsers}
            />
          );
        })}
        {forwardUsers.length!==0 && <SheetFooter className="my-4">
            <Button onClick={() => forwardMessage(message,forwardUsers)}>Forward</Button>
        </SheetFooter>}
      </SheetContent>
    </>
  );
};

export default ForwardMessageSheet;
