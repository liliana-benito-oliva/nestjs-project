import { Injectable } from "@nestjs/common";
import { ESClient } from "./es-client";
import {
  ESError,
  GetAverageResponse,
  GetMedianResponse,
  GetTopNSalariesResponse,
  isESError,
  Politician,
  ServiceError,
} from "../schemas";

@Injectable()
export class GetDatasetsService {
  constructor(private esClient: ESClient) {}
  async getAverage(): Promise<GetAverageResponse | ServiceError> {
    const esResult: number | ESError = await this.esClient.getAverageQuery();
    if (isESError(esResult)) {
      const error: ServiceError = {
        cause: `${esResult.cause} in method: ${esResult.method}`,
        additionalData: esResult.additionalData,
      };
      return error;
    }
    return { average: esResult };
  }

  async getAverageByGender(): Promise<
    { averageByGender: { men: number; women: number } } | ServiceError
  > {
    const esResultM: number | ESError =
      await this.esClient.getAverageQuery("Hombre");
    if (isESError(esResultM)) {
      const error: ServiceError = {
        cause: `${esResultM.cause} in method: ${esResultM.method}`,
        additionalData: esResultM.additionalData,
      };
      return error;
    }

    const esResultF: number | ESError =
      await this.esClient.getAverageQuery("Mujer");
    if (isESError(esResultF)) {
      const error: ServiceError = {
        cause: `${esResultF.cause} in method: ${esResultF.method}`,
        additionalData: esResultF.additionalData,
      };
      return error;
    }
    return { averageByGender: { men: esResultM, women: esResultF } };
  }

  async getMedianSalary(): Promise<GetMedianResponse | ServiceError> {
    const esResult: number | ESError = await this.esClient.getMedianQuery();
    if (isESError(esResult)) {
      const error: ServiceError = {
        cause: `${esResult.cause} in method: ${esResult.method}`,
        additionalData: esResult.additionalData,
      };
      return error;
    }
    return { median: esResult };
  }

  async getMedianSalaryByGender(): Promise<
    { medianByGender: { men: number; women: number } } | ServiceError
  > {
    const esResultM: number | ESError =
      await this.esClient.getMedianQuery("Hombre");
    if (isESError(esResultM)) {
      const error: ServiceError = {
        cause: `${esResultM.cause} in method: ${esResultM.method}`,
        additionalData: esResultM.additionalData,
      };
      return error;
    }

    const esResultF: number | ESError =
      await this.esClient.getMedianQuery("Mujer");
    if (isESError(esResultF)) {
      const error: ServiceError = {
        cause: `${esResultF.cause} in method: ${esResultF.method}`,
        additionalData: esResultF.additionalData,
      };
      return error;
    }
    return { medianByGender: { men: esResultM, women: esResultF } };
  }

  async getTopNSalaries(
    n = 10
  ): Promise<GetTopNSalariesResponse | ServiceError> {
    const esResult: Politician[] | ESError =
      await this.esClient.getTopSalariesQuery({});
    if (isESError(esResult)) {
      const error: ServiceError = {
        cause: `${esResult.cause} in method: ${esResult.method}`,
        additionalData: esResult.additionalData,
      };
      return error;
    }
    return { topSalaries: esResult };
  }

  async getTopNSalariesByGender(): Promise<
    { topSalariesByGender: { women: Politician[]; men: Politician[] } } | ServiceError
  > {
    const esResultM: Politician[] | ESError =
      await this.esClient.getTopSalariesQuery({ gender: "Hombre" });
    if (isESError(esResultM)) {
      const error: ServiceError = {
        cause: `${esResultM.cause} in method: ${esResultM.method}`,
        additionalData: esResultM.additionalData,
      };
      return error;
    }

    const esResultF: Politician[] | ESError =
      await this.esClient.getTopSalariesQuery({ gender: "Mujer" });
    if (isESError(esResultF)) {
      const error: ServiceError = {
        cause: `${esResultF.cause} in method: ${esResultF.method}`,
        additionalData: esResultF.additionalData,
      };
      return error;
    }
    return { topSalariesByGender: { women: esResultF, men: esResultM } };
  }
}
