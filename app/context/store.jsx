'use client';

import { createContext, useState } from "react";

export const LoggedInUserContext = createContext({});

const LoggedInUserProvider = ({children}) => {
  const [loggedInUser, setLoggedInUser] = useState({ 
        user : 
            { 
                name : window.localStorage.getItem('ACTIVE_USER'),
                id: window.localStorage.getItem('USER_ID'),
                email: window.localStorage.getItem('USER_EMAIL')
            }, 
        token: window.localStorage.getItem('AUTH_TOKEN')
    });
    
  //const [loggedInUser, setLoggedInUser] = useState({user: '', token: ''});
  /*useEffect(() => {
    setLoggedInUser({ 
        user : 
            { 
                name : window.localStorage.getItem('ACTIVE_USER'),
                id: window.localStorage.getItem('USER_ID'),
                email: window.localStorage.getItem('USER_EMAIL')
            }, 
        token: window.localStorage.getItem('AUTH_TOKEN')
    })
  }, []);*/
    
    return (<LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        {children}
    </LoggedInUserContext.Provider>)
}

export default LoggedInUserProvider;