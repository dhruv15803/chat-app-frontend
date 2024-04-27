import React, { SetStateAction } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog';
import { Button } from './ui/button';
import { message } from '@/types';

type EditDialogProps = {
    isDialogOpen:boolean;
    setIsDialogOpen:React.Dispatch<SetStateAction<boolean>>;
    newMessage:string;
    setNewMessage:React.Dispatch<SetStateAction<string>>;
    editMessage:(messageId:string,newMessage:string) => Promise<void>;
    message:message;
    setIsShowDropdown:React.Dispatch<SetStateAction<boolean>>;
}

const EditDialog = ({
    isDialogOpen,
    setIsDialogOpen,
    newMessage,
    setNewMessage,
    editMessage,
    message,
    setIsShowDropdown,
}:EditDialogProps) => {
  return (
    <>
    <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                Edit message
            </AlertDialogHeader>
            <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="p-2 border-2 rounded-lg" />
            <AlertDialogFooter>
            <Button onClick={() => {
                setIsDialogOpen(false);
                setNewMessage("");
            }}>Cancel</Button>
            <Button onClick={async () => {
                await editMessage(message._id,newMessage);
                setIsDialogOpen(false);
                setIsShowDropdown(false);
            }}>Save changes</Button>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
 )
}

export default EditDialog