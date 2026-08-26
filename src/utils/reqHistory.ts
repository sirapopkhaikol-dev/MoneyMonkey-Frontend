import { client_State } from "@/types/history";

export const buildHistoryParams  = (
    pagination : client_State['pagination'],
    appliedFilter: client_State['appliedFilter']
) => {
    const params = new URLSearchParams()

    params.set('page', String(pagination.page))
    params.set('limit', String(pagination.limit))

    if (appliedFilter.min_amount !== undefined) {
        params.set('min_amount', String(appliedFilter.min_amount))
    }

    if (appliedFilter.max_amount !== undefined) {
        params.set('max_amount', String(appliedFilter.max_amount))
    }

    if (appliedFilter.min_years !== undefined) {
        params.set('min_years', String(appliedFilter.min_years))
    }

    if (appliedFilter.max_years !== undefined) {
        params.set('max_years', String(appliedFilter.max_years))
    }

    return params.toString()
}