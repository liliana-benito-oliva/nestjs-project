import { Injectable } from "@nestjs/common";
import { customCsvParse, getPathFormated } from "../common";
import {ESClient} from "./es-client";
import { isESError, ServiceError } from "../schemas";
import * as fs from 'fs';

@Injectable()
export class ImportCsvService {
  constructor(private esClient: ESClient) {}

  async postCsv(csv: Express.Multer.File): Promise<string | ServiceError> {
    //If index doesnt exist we create it
    await this.esClient.init();
    
    const buffer = fs.readFileSync(getPathFormated(csv.path));
    const csvData = customCsvParse(buffer.toString());
    const esResult = await this.esClient.indexBulk(csvData);
    if (isESError(esResult)) {
      const error: ServiceError = {
        cause: `${esResult.cause} in method: ${esResult.method}`,
        additionalData: esResult.additionalData,
      };
      return error;
    }
    return 'OK'
  }
}
