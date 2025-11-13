
import { UserType } from "@/utils/UserType";
import { createContext } from "react";
interface UserDetailContextProps {
    userDetail: UserType | null, setUserDetail: (user: UserType | null) => void
}
export const UserDetailContext = createContext<UserDetailContextProps | null>(null)