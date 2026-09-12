import ApiError from "./apiError";

type RefreshResult = {
    access_Token: string,
    user_info : {
        email: string,
        id: number,
        name: string,
        picture: string,
        role: string
    }
}

let refreshPromise : Promise<RefreshResult> | null = null

class AuthServices {
    static googleLogin = async ( idToken : string ) => {

        // and how to deside our api and try catch , or middlware like backend                         
        const req = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
            {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ idToken: idToken }),
                credentials: "include"
                
            }
            
        );

        const res = await req.json()

        if (!req.ok) {
            throw new ApiError(res.message, req.status, res.code)
        }

        const data = res.data
        const access_Token = data.accessToken
        const user_info = data.user

        return {
            access_Token: access_Token,
            user_info : {
                email: user_info.email,
                id: user_info.id,
                name: user_info.name,
                picture: user_info.picture,
                role: user_info.role
            }
        };

    }

    static refresh = async () => {
        const req = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
            {
                method: 'post',
                headers: { 'Content-type' : 'application/json' },
                credentials: 'include'
            }
        )

        const res = await req.json()

        if (!req.ok) {
            throw new ApiError(res.message, req.status, res.code)
        }

        const data = res.data
        const access_Token = data.accessToken
        const user_info = data.user

        return {
            access_Token: access_Token,
            user_info : {
                email: user_info.email,
                id: user_info.id,
                name: user_info.name,
                picture: user_info.picture,
                role: user_info.role
            }
        };
    }

    static refreshOnce = () => {
        if (!refreshPromise) {
            refreshPromise = AuthServices.refresh().finally(() => { refreshPromise = null })
        }

        return refreshPromise
    }

    static logout = async () => {
        const req = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
            {
                method: 'delete',
                headers: { 'Content-type': 'application/json' },
                credentials: "include"
            }
            
        );

        const res = await req.json()

        if (!req.ok) {
            throw new ApiError(res.message, req.status, res.code)
        }

        return
    }
}

export default AuthServices;