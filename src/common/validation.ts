import { GetDatasetsRequest } from "src/schemas"


export const validateDatasetQueryParams = (params: GetDatasetsRequest): boolean => {
    return params.methods.length > 0 //TODO MORE
}