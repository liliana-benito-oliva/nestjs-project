import { Controller, Get, Query } from "@nestjs/common";
import { buildErrorResponseFromServiceError, simpleApiLogger } from "../common";
import {
  GetProfilesFilters,
  isServiceError,
  responseCodes,
  ResponseGeneric,
} from "../schemas";
import { GetProfilesService } from "src/services/get-profiles";

@Controller()
export class GetProfilesController {
  loggerContext: string = "get-profiles-controller";
  constructor(private readonly appService: GetProfilesService) {}

  @Get()
  getDatasets(@Query() params: GetProfilesFilters): ResponseGeneric {
    //validation params
    if (false) {
      return buildErrorResponseFromServiceError(400, {});
    }
    simpleApiLogger(
      this.loggerContext,
      "debug",
      "controller called with:",
      params
    );
    const serviceResponse = this.appService.getProfiles(params);
    if (isServiceError(serviceResponse)) {
      return buildErrorResponseFromServiceError(500, serviceResponse);
    }
    return {
      code: 200,
      description: responseCodes[200],
      body: serviceResponse,
    };
  }
}
