import { useAuth } from "@/components/contexts/authContext"
import ApiServices from "@/services/api"
import AuthServices from "@/services/auth"
import { Api } from "@/types/api"

export function useApi() {
    const { accessToken, setUser, setAccessToken } = useAuth()
    // const { isLoading } = useAuth()

    const get = async (url: string = '/') => {
        try {
            // prevent when accessToken state is null when start app
            // if (isLoading === true && accessToken === null) {return}  we will change to detect in component instead
            const res = await ApiServices.apiFetch('get', url, undefined, accessToken)
            return res
        } 
        catch (error) {
            // accessToken expire or 
            // invalid (logout) or 
            // Network Error or 
            // Api Error
            return await ApiHanler(error, 'get', url, undefined);
 
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
            return await ApiHanler(error, 'post', url, body);
 
        }
    }

    const ApiHanler = async (
        error : unknown, 
        method : Api, 
        url : string = '/',
        body : object | undefined = undefined,
    ) => {
        try {
            // in the future, we will change detext by error.code
            console.log('Route Error')
            if ((error instanceof Error && error.message === "Access token expired")) {
                console.log('Token Exppire')

                const refresh = await AuthServices.refresh()

                const new_access_Token = refresh.access_Token
                const user_info = refresh.user_info
                
                setAccessToken(new_access_Token)
                setUser(user_info)

                console.log('refresh finish')

                const res = await ApiServices.apiFetch(method, url, body, new_access_Token)
                return res
            }

            // future we need to check by res.code because
            // not every Error need to return to / (login)
            else { throw new Error }
        } 
        catch (error) {
            // refresh expire/invalid or 
            // network Error or
            // Api Error from else { throw new Error } or
            // accessToken have error from else { throw new Error }
            console.log('refreshToken Expire or Invalid or Network Error or Api Error ->>>>',error);
            // redirect to / to login again if not is api error
            // or retrun default value
            // future feature
        }
    }

    return {
        get,
        post
    };
    
}