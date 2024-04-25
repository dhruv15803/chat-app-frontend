export type User = {
    _id:string;
    email:string;
    password?:string;
    username:string;
    firstName?:string;
    lastName?:string;
    avatar?:string;
    createdAt:string;
    updatedAt:string;
}


export type GlobalContextType = {
    loggedInUser:User;
    setLoggedInUser:React.Dispatch<React.SetStateAction<{} | User>>;
    isLoggedIn:boolean;
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>;
}

