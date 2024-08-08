import { createContext, ReactNode, useContext, useEffect, useState } from "react";
 

interface IService {
    _id: string;
    service: string;
    
    description: string;
    price: number;
    provider: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    logoutUser : () => void
    storeTokenInLS: (serverToken: string) => void;
    user: string;
    services: IService[];
    AuthorizationToken: string;
    // isAdmin: boolean;
    isLoading: boolean;
    
}



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

import { API } from "../Constants";

const URL = `${API}/api/auth/user`;

export const AuthProvider: React.FC<AuthProviderProps> = ({children})=>{

        const [token, setToken]= useState(localStorage.getItem('token'));
        const [user, setUser] = useState("");
        const [services, setServices] = useState<IService[]>([]);
        // const [isAdmin, setIsAdmin] = useState(false);
        const [isLoading, setIsLoading] = useState(true )


        
        
        // const [isLoggedIn, setIsLoggedIn] = useState(false);


        useEffect(() => {
        
            getServices();
            userAuthentication();
            
    
        },[token])

        

    //METHOD TO STORE TOKEN
    const storeTokenInLS = (serverToken:string) =>{
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };


    let isLoggedIn = !!token;
    
    


    //METHOD TO LOGOUT
    const logoutUser = ()=>{
        setToken("")
        setUser("")
        return localStorage.removeItem('token')
    }


    //JWT token authentication : to get currently logged in user's data
    const AuthorizationToken = `Bearer ${token}`;

    const userAuthentication = async () =>{
        try {  
            setIsLoading(true)
            if(!token)return;
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    'Authorization': AuthorizationToken
                }
            } );

            if(response.ok == false){
                console.log("Response not OK:", response.status, response.statusText);

            }else{
               
                const data = await response.json();
                // console.log("logged in user's data : ", data.userData);
                setUser(data.userData);
                setIsLoading(false);
          
            }
            
        } catch (error) {
            console.log("error",error);
        }
        
    }
    

    //getServices for the servicePage
    //from the backend 
    const getServices = async () => {
        try {
            const response = await fetch(`${API}/api/data/services`, {
                method: "GET"
            });
    
            if (response.ok) {
                const data = await response.json();
                // console.log("API response data:", data);
                setServices(data);

    
                // Ensure the response data structure matches what you expect
                
            } else {
                console.error("Response not OK:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };
    
 
    

    return <AuthContext.Provider value={{  isLoggedIn , storeTokenInLS, user, logoutUser,  services , AuthorizationToken, isLoading  }}>
        {children}
    </AuthContext.Provider>

}


export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error ("useAuth used outside of the provider")
    }
    return authContextValue;
}
