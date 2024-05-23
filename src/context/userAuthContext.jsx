import { createContext, useContext, useEffect, useState} from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../Config/Firebase/config";


const userAuthContext = createContext();

export function UserAuthContextProvider({children}){
    const [user, setUser] = useState("");

    function googleSignIn(){
    if (!navigator.onLine) {
      throw new Error("no_internet_connection");
    }
        return signInWithPopup(auth, googleAuthProvider);
    }

    function logOut(){
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, []);
    return (
        <userAuthContext.Provider value={{user, googleSignIn, logOut}}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth(){
    return useContext(userAuthContext);
}