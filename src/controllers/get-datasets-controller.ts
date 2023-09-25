import { Controller, Get, Query } from "@nestjs/common";
import { GetDatasetsRequest } from "../schemas/requests/get-datasets-request";
import { buildErrorResponseFromServiceError, simpleApiLogger } from "../common";
import { validateDatasetQueryParams } from "../common/validation";
import {
  isServiceError,
  responseCodes,
  ResponseGeneric,
} from "../schemas";
import { GetDatasetsService } from "../services";
import { ApiOperation, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { PoliticianDto } from "src/schemas/responses/politician.dto";

@Controller("data-operations")
export class GetDatasetsController {
  loggerContext: string = "get-datasets-controller";
  methodDictionary = {
    "get-average": "getAverage",
    "get-median": "getMedianSalary",
    "get-top-salaries": "getTopNSalaries",
    "get-average-by-gender": "getAverageByGender",
    "get-median-by-gender": "getMedianSalaryByGender",
    "get-top-salaries-by-gender": "getTopNSalariesByGender",
  };
  constructor(private readonly appService: GetDatasetsService) {}

  @Get()
  @ApiOperation({
    summary:
      "Returns several functions, these can be passed as an array to execute as many or as few as desired",
  })
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        average: {
          type: "number",
        },
        averageByGender: {
          type: "object",
          properties: {
            men: {
              type: "number",
            },
            women: {
              type: "number",
            },
          },
        },
        median: {
          type: "number",
        },
        medianByGender: {
          type: "object",
          properties: {
            men: {
              type: "number",
            },
            women: {
              type: "number",
            },
          },
        },
        topSalaries: {
          type: 'array',
          items: {$ref: getSchemaPath(PoliticianDto)}
        },
        topSalariesByGender: {
          type: 'object',
          properties: {
            men: {
              type: 'array',
              items: {$ref: getSchemaPath(PoliticianDto)}
            },
            women: {
              type: 'array',
              items: {$ref: getSchemaPath(PoliticianDto)}
            }
          }
        }
      },
    },
  })
  @ApiResponse({ status: 500, description: "description of the error from es" })
  async getDatasets(
    @Query() params: GetDatasetsRequest
  ): Promise<ResponseGeneric> {
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
    const responseData = await methodsToExecute.reduce(async (acc, method) => {
      const prev = await acc;
      const serviceResponse = await this.appService[method]();
      if (isServiceError(serviceResponse)) {
        return buildErrorResponseFromServiceError(500, serviceResponse);
      }
      return { ...prev, ...serviceResponse };
    }, Promise.resolve([]));
    return { code: 200, description: responseCodes[200], body: responseData };
  }
}
