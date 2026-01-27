import { createContext, useContext } from "react"
// import { type UserContextProps, type UserData } from "../interfaces"

const defaultUserContext = {
    // id: 3,
    // username: "johnny225",
    // email: "johnny@example.com",
    // tier: "Free",
    // created_at:{},
    userData: undefined
};
export const UserContext = createContext<any | null >(defaultUserContext)

export const useUserContext = () => useContext(UserContext);

export const AuthStateContext = createContext<any>(null);

export const AuthDispatchContext = createContext<any>(null)

export const AuthContext = createContext<any>({cu: null});