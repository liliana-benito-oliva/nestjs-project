import { Injectable } from "@nestjs/common";
import { ESClient } from "./es-client";
import {
  GetProfilesFilters,
  isESError,
  PoliticiansAndPagination,
  ServiceError,
} from "../schemas";

@Injectable()
export class GetProfilesService {
  constructor(private esClient: ESClient) {}

  async getProfiles(
    params: GetProfilesFilters
  ): Promise<PoliticiansAndPagination | ServiceError> {
    const esResult = await this.esClient.getPoliticiansWithPagination(params);
    if (isESError(esResult)) {
      const error: ServiceError = {
        cause: `${esResult.cause} in method: ${esResult.method}`,
        additionalData: esResult.additionalData,
      };
      return error;
    }
    return esResult;
  }
}
