import { Controller, Get, Query } from "@nestjs/common";
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { PoliticiansAndPaginationDto } from "src/schemas/responses/politiciansAndPagination.dto";
import { buildErrorResponseFromServiceError, simpleApiLogger } from "../common";
import { isServiceError, responseCodes, ResponseGeneric } from "../schemas";
import { GetProfilesService } from "../services/get-profiles";

@Controller("politicians")
export class GetProfilesController {
  loggerContext: string = "get-profiles-controller";
  constructor(private readonly appService: GetProfilesService) {}

  @Get()
  @ApiOperation({
    summary:
      "Search on the index politicians, can use fuzzy search on name, strict search on party, gender or charge",
  })
  @ApiQuery({ name: "name", required: false, type: String, example: "María" })
  @ApiQuery({
    name: "party",
    required: false,
    type: String,
    example: "Partido Popular",
  })
  @ApiQuery({
    name: "gender",
    required: false,
    type: String,
    enum: ["Hombre", "Mujer"],
  })
  @ApiQuery({
    name: "charge",
    required: false,
    type: String,
    example: "Alcalde",
  })
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "pageSize", required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    type: PoliticiansAndPaginationDto,
    schema: { $ref: getSchemaPath(PoliticiansAndPaginationDto) },
  })
  @ApiResponse({ status: 500, description: "description of the error from es" })
  async getDatasets(
    @Query("name") name: string,
    @Query("party") party: string,
    @Query("gender") gender: string,
    @Query("charge") charge: string,
    @Query("page") page: number,
    @Query("pageSize") pageSize: number
  ): Promise<ResponseGeneric> {
    const params = { name, party, gender, charge, page, pageSize };
    simpleApiLogger(this.loggerContext, "debug", "controller called with:", {
      name,
      party,
      gender,
      charge,
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
