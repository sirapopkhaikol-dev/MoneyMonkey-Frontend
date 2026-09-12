import { useAuth } from "@/components/contexts/authContext"
import ApiServices from "@/services/api"
import ApiError from "@/services/apiError"
import AuthServices from "@/services/auth"
import { Api } from "@/types/api"


export function useApi() {
    const { accessToken, setUser, setAccessToken } = useAuth()
    // const { isLoading } = useAuth()

    const get = async (
        url: string = '/', 
        signal ?: AbortSignal
    ) => {
        try {
            // prevent when accessToken state is null when start app
            // if (isLoading === true && accessToken === null) {return}  we will change to detect in component instead
            const res = await ApiServices.apiFetch('get', url, undefined, accessToken, signal)
            return res
        } 
        catch (error) {

            // cancellation → don't treat as an error
            if (error instanceof DOMException && error.name === "AbortError") { return; }

            // accessToken expire or 
            // invalid (logout) or 
            // Network Error or 
            // Api Error
            return await ApiHandler(error, 'get', url, undefined, signal);
 
        }

    }

    const post = async (
        url: string = '/', 
        body: object | undefined = undefined, 
    ) => {

        try {
            
            // prevent when accessToken state is null when start app
            // if (isLoading === true && accessToken === null) {return}  we will change to detect in component instead
            const res = await ApiServices.apiFetch('post', url, body, accessToken)
            return res
        } 
        catch (error) {
            // accessToken expire or 
            // invalid (logout) or 
            // Network Error or 
            // Api Error
            return await ApiHandler(error, 'post', url, body);
 
        }
    }

    const ApiHandler = async (
        error : unknown, 
        method : Api, 
        url : string = '/',
        body : object | undefined = undefined,
        signal ?: AbortSignal
    ) => {

        if (error instanceof ApiError) {

            switch (error.code) {

                // 1. Unauthorize (Send Api without headers['Authorization'] = `Bearer ${accessToken}`) to the protect api
                case "UNAUTHORIZED":
                    // console.log(error.message);
                    // in component will receive error.message , error.status to toast
                    throw error;

                // 2. Access token expired
                case "ACCESS_TOKEN_EXPIRED":
                    try {

                        const refresh = await AuthServices.refreshOnce()
                        // const refresh = await AuthServices.refresh()

                        const new_access_Token = refresh.access_Token
                        const user_info = refresh.user_info
                        
                        setAccessToken(new_access_Token)
                        setUser(user_info)

                        const res = await ApiServices.apiFetch(method, url, body, new_access_Token, signal)
                        return res
                    }
                    catch (error) {
                        // if step 2 refresh token fail
                        // example code = REFRESH_TOKEN_EXPIRED, USER_NOT_LOGIN, INVALID_REFRESH_TOKEN, USER_NOT_FOUND

                        if (error instanceof ApiError) {

                            // case 'REFRESH_TOKEN_EXPIRED'
                            // case 'INVALID_REFRESH_TOKEN'
                            // case 'USER_NOT_LOGIN'
                            // case 'USER_NOT_FOUND'

                            // console.log(error.message)
                            // console.log(error.status)

                            throw error

                        }

                        // other error from ApiServices.apiFetch, component that call this before will receive error.message , error.status to toast
                        throw error
                    }  

                // 3. Access token invalid
                case "INVALID_ACCESS_TOKEN":
                    // console.log(error.message)
                    // - logout, clear token, redirect
                    // - component that call this before will receive error.message , error.status to toast
                    throw error
              
                default:
                    break;
            }

            // 4. Normal Api Error from default break
            // 6. 204 No content 

            throw error;

        }


        // 5. Network Error
 
        // in component will receive error.message , error.status to toast
        throw error;
    
    }

    return {
        get,
        post
    };
    
}