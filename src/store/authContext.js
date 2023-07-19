import { useState, createContext,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();//just an empty context so initially its contents are null

/**
 * This context called authContext is special for authentication data management only
 * if arise a need to manage other app data we'll create another context
 */

export const AuthContextProvider = props => {
    const { children } = props;
    const [user,setLoggedInUser] = useState();
    const setUser = loggedInUser => {
        // 1. when nothing is set then we return
        if(!loggedInUser ) return
        //2. set on local storage 
         if( loggedInUser ){
            storeUser(loggedInUser)
         }
        //3. set on context management
        setLoggedInUser( loggedInUser )
    }

    const storeUser = async value => {
        try {
            await AsyncStorage.setItem('@user', JSON.stringify(value))
          } catch (e) {
            // saving error
          }
    }

    const removeUserFromStore = async () => {
        try {
          await AsyncStorage.removeItem('@user')
        } catch(e) {
          // remove error
        }
    }
    const logout = () => {
        removeUserFromStore();
        setLoggedInUser();
    }

    const getLoggedInUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@user')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
          } catch(e) {
            // error reading value
          }
    }

    const getUser = async () => {
        let storedUser = await getLoggedInUser()
        setLoggedInUser( storedUser );
    }

    useEffect(() => {
        (async () => {
            getUser()
        })();
    })
    return <AuthContext.Provider value = {{user,setUser,logout}}>
    {children}
    </AuthContext.Provider>
}