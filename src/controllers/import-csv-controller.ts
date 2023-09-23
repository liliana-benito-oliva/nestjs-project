import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  simpleApiLogger,
  buildErrorResponseFromServiceError,
} from "../common";
import {
  isServiceError,
  responseCodes,
  ResponseGeneric,
  ServiceError,
} from "../schemas";
import { ImportCsvService } from "../services";

@Controller('files')
export class ImportCsvController {
  constructor(private readonly appService: ImportCsvService) {}
  loggerContext: string = "import-csv-controller";

  @Post()
  @UseInterceptors(FileInterceptor("csv"))
  postCsv(@UploadedFile() csv: Express.Multer.File): ResponseGeneric {
    //Validate file data
    if (false) {
      return buildErrorResponseFromServiceError(400, {});
    }
    simpleApiLogger(
      this.loggerContext,
      "debug",
      "controller called with valid file"
    );
    const serviceResponse = this.appService.postCsv();
    if (isServiceError(serviceResponse)) {
      return buildErrorResponseFromServiceError(
        500,
        serviceResponse
      );
    }
    return { code: 201, description: responseCodes[201] };
  }
}
