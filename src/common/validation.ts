import { GetDatasetsRequest } from "../schemas/requests/get-datasets-request"


export const validateDatasetQueryParams = (params: GetDatasetsRequest): boolean => {
    return params.methods.length > 0 //TODO MORE
}