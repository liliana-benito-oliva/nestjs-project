import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../common/validation";
import {
  simpleApiLogger,
  buildErrorResponseFromServiceError,
} from "../common";
import {
  isServiceError,
  responseCodes,
  ResponseGeneric,
} from "../schemas";
import { ImportCsvService } from "../services";

@Controller('files')
export class ImportCsvController {
  constructor(private readonly appService: ImportCsvService) {}
  loggerContext: string = "import-csv-controller";

  @Post()
  @UseInterceptors(FileInterceptor("csv", multerOptions))
  async postCsv(@UploadedFile() csv: Express.Multer.File): Promise<ResponseGeneric> {
    simpleApiLogger(
      this.loggerContext,
      "debug",
      "controller called with valid file"
    );
    const serviceResponse = await this.appService.postCsv(csv);
    if (isServiceError(serviceResponse)) {
      return buildErrorResponseFromServiceError(
        500,
        serviceResponse
      );
    }
    return { code: 201, description: responseCodes[201] };
  }
}
