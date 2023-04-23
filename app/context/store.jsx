'use client';

import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

const LoggedInUserContext = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(window.localStorage.getItem('ACTIVE_USER'));
    const [userDetails, setUserDetails] = useState('');

    return (<GlobalContext.Provider value={{loggedInUser, setLoggedInUser, userDetails, setUserDetails}}>
        {children}
    </GlobalContext.Provider>)
}

export default LoggedInUserContext;