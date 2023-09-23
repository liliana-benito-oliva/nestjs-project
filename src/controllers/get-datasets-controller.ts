import { Controller, Get, Query } from "@nestjs/common";
import {
  buildErrorResponseFromServiceError,
  simpleApiLogger,
} from "../common";
import { validateDatasetQueryParams } from "../common/validation";
import {
  GetDatasetsRequest,
  GetDatasetsResponse,
  isServiceError,
  responseCodes,
  ResponseGeneric,
} from "../schemas";
import { GetDatasetsService } from "../services";

@Controller()
export class GetDatasetsController {
  loggerContext: string = "get-datasets-controller";
  methodDictionary = {
    "get-average": this.appService.getAverage,
    "get-median": this.appService.getMedianSalary,
    "get-top-salaires": this.appService.getTopNSalaries,
  };
  constructor(private readonly appService: GetDatasetsService) {}

  @Get()
  getDatasets(@Query() params: GetDatasetsRequest): ResponseGeneric {
    if (!validateDatasetQueryParams(params)) {
      return buildErrorResponseFromServiceError(400, {});
    }
    simpleApiLogger(
      this.loggerContext,
      "debug",
      "controller called with:",
      params
    );
    const methodsToExecute = params.methods.map(
      (methodName) => this.methodDictionary[methodName]
    );
    const responseData: GetDatasetsResponse = methodsToExecute.reduce(
      (acc, method) => {
        const serviceResponse = method();
        if (isServiceError(serviceResponse)) {
          return buildErrorResponseFromServiceError(
            500,
            serviceResponse
          );
        }
        return { ...acc, ...serviceResponse };
      },
      {}
    );
    return { code: 200, description: responseCodes[200], body: responseData };
  }
}
