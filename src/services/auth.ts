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

        if (req.status != 200) { throw new Error }

        const res = await req.json()

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
            throw new Error(res.message)
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
}

export default AuthServices;