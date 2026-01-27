import { useReducer} from "react";
import { AuthContext,AuthDispatchContext, AuthStateContext } from "../contexts";
import type { ChildrenProps } from "../interfaces";
import {  authReducer } from "../reducers";

export default function AuthProvider({children}: ChildrenProps) 
{

    const usr = localStorage.getItem('current_user') ?? null;
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [loggedOut, setLoggedOut] = useState(true);
    // const [currentUser, setCurrentUser] = useState(null);

    // const getToken = () => localStorage.getItem('current_user') ?? null;
    // const logout = () => {
    //     localStorage.removeItem('current_user')
    //     setCurrentUser(null);
    //     setLoggedOut(true);
    //     console.log('logging out?')
    // }

    // const login = () => {
    //     const usr = getToken();
    //     if(usr && !currentUser){
    //     const cu = JSON.parse(usr);
    //       setLoggedOut(false);
    //       setLoggedIn(true);
    //       setCurrentUser(cu);
    //     }

    // }

    // useEffect(() => {

    //     if(usr && !currentUser) {

    //      const cu = JSON.parse(usr);
    //       setLoggedOut(false);
    //       setCurrentUser(cu);

    //     }
    // },[currentUser, setCurrentUser])

    const initialState = {
        cu: null,
        token: usr,
        //  loggedOut,
        //  setLoggedOut,
        //  logout,
        //  login,
         loggedIn: false,
    };

    const [state, dispatch ] = useReducer(authReducer, initialState);


    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                <AuthContext.Provider value={{state, dispatch}}>
                    {children}
                </AuthContext.Provider>
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>

    )
}