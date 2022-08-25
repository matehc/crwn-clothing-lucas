import  { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener,createUserDocumentFromAuth, signOutUser } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

 

// create context provider
export const UserProvider = ( {children} ) => {
    // this hook is for storing data related to users 
    // it will be passed to any component inside UserContext.provider
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };



    useEffect( () => {
        const unscubscribe = onAuthStateChangedListener( (user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            console.log(user);
            setCurrentUser(user);
        })
        return unscubscribe;
     }, []);

    // value variable is inserted into value attribute
    // look at this very well its like a component with props and any component inside a component , 
    // has access to its parent props.
    return <UserContext.Provider value={value}> {children} </UserContext.Provider>
}