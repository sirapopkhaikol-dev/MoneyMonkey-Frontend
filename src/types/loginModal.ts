import React from "react"


// send state to child
export interface LoginModalProps {
    isLoginOpen : boolean,
    setIsLoginOpen : React.Dispatch<React.SetStateAction<boolean>>
}