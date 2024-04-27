import React, { SetStateAction } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu";
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { message } from '@/types';

type MessageDropDownProps = {
    setIsShowDropdown:React.Dispatch<React.SetStateAction<boolean>>;
    deleteMessage:(messageId:string) => Promise<void>;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    setNewMessage:React.Dispatch<React.SetStateAction<string>>;
    message:message;
}

const MessageDropDown = ({
    setIsShowDropdown,
    deleteMessage,
    setIsDialogOpen,
    setNewMessage,
    message,
}:MessageDropDownProps) => {
  return (
    <>
    <div className='flex flex-col gap-2 border-2 rounded-lg p-2 w-[25%]'>
            <div className='p-1 font-semibold'>Message</div>
            <Separator/>
            <div className='flex'><Button className='w-full' onClick={async () => {
                await deleteMessage(message._id)
                setIsShowDropdown(false);
                }} variant="ghost">Delete</Button></div>
            <div className='flex'><Button className='w-full' variant="ghost" onClick={async () => {
                setIsDialogOpen(true);
                setNewMessage(message.message)
            }}>Edit</Button></div>
            <div className='flex'><Button className='w-full' variant="ghost">Forward</Button></div>
    </div>
    </>
  )
}

export default MessageDropDown

{/* <DropdownMenu>
<DropdownMenuContent>
    <DropdownMenuLabel>Message</DropdownMenuLabel>
    <DropdownMenuSeparator/>
    <DropdownMenuItem><Button onClick={async () => {
        await deleteMessage(message._id)
        setIsShowDropdown(false);
        }} variant="ghost">Delete</Button></DropdownMenuItem>
    <DropdownMenuItem><Button variant="ghost" onClick={async () => {
        setIsDialogOpen(true);
        setNewMessage(message.message)
    }}>Edit</Button></DropdownMenuItem>
    <DropdownMenuItem>Forward</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu> */}