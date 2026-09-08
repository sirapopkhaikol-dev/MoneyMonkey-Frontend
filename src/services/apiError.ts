class ApiError extends Error {
    status : number;
    code : string | undefined;

    constructor(message : string , status: number, code: string | undefined) {
        super(message);
        this.status = status;
        this.code = code
    }
}

export default ApiError;