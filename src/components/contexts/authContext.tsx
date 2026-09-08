"use client";

import AuthServices from "@/services/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
    email: string;
    id: number;
    name: string;
    picture: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    accessToken: string | null;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    login: (user: User, accessToken: string) => void;
    logout: () => void;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        const getValueWhenRefresh = async () => {
            try {
                const req = await AuthServices.refreshOnce()
                setUser(req.user_info);
                setAccessToken(req.access_Token);
            }
            catch (error) {
                 //so this catch error , need to happen from Authservice.refresh() return Error , for example 1.dont have refresh token (user dont login yet) , we should not alert error 2. refresh token expired this is where error should alert 

                // the same as api return step 2 refresh token fail
                // example code = REFRESH_TOKEN_EXPIRED, USER_NOT_LOGIN, INVALID_REFRESH_TOKEN, USER_NOT_FOUND
                console.log(error instanceof Error ? error.message : 'Refresh Token Expire or Invalid')

                // should not be responsible for user-facing API error notifications.
                // for example first visit
                // time we will not throw error becuase this function call by useEffect
                // throw error

                setUser(null);
                setAccessToken(null);
            }
            finally{
                setIsLoading(false);
            }
        }

        getValueWhenRefresh();

    },[])

    const login = async (user: User, accessToken: string) => {
        setUser(user);
        setAccessToken(accessToken);
    };

    const logout = async () => {
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                accessToken,
                setAccessToken,
                login,
                logout,
                setIsLoading,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}