import { Api } from "@/types/api";

class ApiServices {

    static apiFetch = async (
        method: Api,
        url: string = '/', 
        body: object | undefined = undefined, 
        accessToken: string | null 
    ) => {

        const req = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${url}`,
            {
                method: `${method}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: body ? JSON.stringify(body) : undefined,
            }
        )

        const res = await req.json()

        if(!req.ok) {throw new Error(res.message)}

        return res;

    }

}

export default ApiServices;