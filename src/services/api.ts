import { Api } from "@/types/api";
import ApiError from "./apiError";

type ReqData = {
    method : Api,
    headers : {
        'Content-Type': string,
        'Authorization' ?:string
    },
    body ?: string
}

class ApiServices {

    static apiFetch = async (
        method: Api,
        url: string = '/', 
        body: object | undefined = undefined, 
        accessToken: string | null 
    ) => {

        const reqData :  ReqData = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined,
        }

        if (accessToken) {
            reqData.headers['Authorization'] = `Bearer ${accessToken}`
        }

        const req = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${url}`,
            reqData
        )

        // [1] + [2]
        if (req.status === 204 || !req.headers.get('Content-Type')?.includes('application/json')) {
            throw new ApiError('No Content', 204, 'INVALID_RESPONSE')
        }

        const res = await req.json()

        if(!req.ok) { 
            throw new ApiError(res.message, req.status, res.code)
        }

        return res;

    }
        
}

export default ApiServices;