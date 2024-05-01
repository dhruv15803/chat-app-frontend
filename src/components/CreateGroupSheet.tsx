import React, { useEffect, useState } from "react";
import { SheetClose, SheetContent, SheetFooter, SheetHeader } from "./ui/sheet";
import { User } from "@/types";
import GroupUserCard from "./GroupUserCard";
import { Button } from "./ui/button";
import axios from "axios";
import { backendUrl } from "@/App";
import { Separator } from "./ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "./ui/alert-dialog";
import { Input } from "./ui/input";

const CreateGroupSheet = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [groupUsers, setGroupUsers] = useState<String[]>([]);
  const [groupName,setGroupName] = useState<string>("");

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/getAllUsers`, {
        withCredentials: true,
      });
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const createGroup = async () => {
    try {
        const response = await axios.post(`${backendUrl}/api/group/create`,{
            groupName,
            groupUsers,
        },{withCredentials:true});
        setGroupName("");
        setGroupUsers([]);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);
  
  return (
    <>
      <SheetContent>
        <SheetHeader className="font-semibold my-2">
          Add group members
        </SheetHeader>
        <Separator />
        {users?.map((user) => {
          return (
            <GroupUserCard
              key={user._id}
              user={user}
              groupUsers={groupUsers}
              setGroupUsers={setGroupUsers}
            />
          );
        })}
        { groupUsers.length!==0 && <SheetFooter className="my-2">
        <AlertDialog>
            <AlertDialogTrigger><Button>Create group</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="text-xl font-semibold">Enter group name</AlertDialogHeader>
                <Input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Enter group name"/>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={createGroup}>Create</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </SheetFooter>}
      </SheetContent>
    </>
  );
};

export default CreateGroupSheet;
