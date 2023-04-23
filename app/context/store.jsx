'use client';

import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

const LoggedInUserContext = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(
        { 
            user : 
                { 
                    name : window.localStorage.getItem('ACTIVE_USER'),
                    id: window.localStorage.getItem('USER_ID'),
                    email: window.localStorage.getItem('USER_EMAIL')
                }, 
            token: window.localStorage.getItem('AUTH_TOKEN')
        }
    );

    return (<GlobalContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        {children}
    </GlobalContext.Provider>)
}

export default LoggedInUserContext;