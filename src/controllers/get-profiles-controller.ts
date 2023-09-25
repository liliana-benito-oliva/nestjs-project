import { Controller, Get, Query } from "@nestjs/common";
import { buildErrorResponseFromServiceError, simpleApiLogger } from "../common";
import {
  GetProfilesFilters,
  isServiceError,
  responseCodes,
  ResponseGeneric,
} from "../schemas";
import { GetProfilesService } from "../services/get-profiles";

@Controller("politicians")
export class GetProfilesController {
  loggerContext: string = "get-profiles-controller";
  constructor(private readonly appService: GetProfilesService) {}

  @Get()
  async getDatasets(
    @Query("name") name: string,
    @Query("party") party: string,
    @Query("gender") gender: string,
    @Query('charge') charge: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number
  ): Promise<ResponseGeneric> {
    const params = { name, party, gender, charge, page, pageSize };
    simpleApiLogger(this.loggerContext, "debug", "controller called with:", {
      name,
      party,
      gender,
      charge
    });
    const serviceResponse = await this.appService.getProfiles(params);
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
