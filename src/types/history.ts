// in history/page.tsx
export type client_State = {
    filter: {
        min_amount: number | undefined,
        max_amount: number | undefined,
        min_years: number | undefined,
        max_years: number | undefined
    },
    appliedFilter : {
        min_amount: number | undefined,
        max_amount: number | undefined,
        min_years: number | undefined,
        max_years: number | undefined 
    },
    pagination : {
        page: number,
        limit: number
    },
    isHistoryLoading : boolean,
    isError : boolean
}


export type server_State = {
    reqHistory : {
        id : number,
        initial_amount : number,
        n_years : number,
        created_at : string
    } [] ,
    pagination : {
        lastPage : number,
        totalFilteredRows : number
    },
    range : {
        amount: {
            max_amount : number,
            min_amount : number
        },
        years: {
            max_years : number,
            min_years : number
        }
    },
    summary : {
        entriesRows : number
    }
}


// -------------------------------

// in history/[id]/page.tsx

export type IdHistoryResult = {
    predictions: predictions,
    rowCount : number
}

export type predictions = {
    created_at : string,
    initial_amount : number,
    n_years : number,
    prediction_id : number,
    results : Resultpredictions[]
}

export type Resultpredictions = {
    amount : number,
    inflation_rate : number,
    year : number
}