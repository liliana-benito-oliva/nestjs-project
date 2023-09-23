import { Injectable } from "@nestjs/common";
import {
  GetAverageResponse,
  GetMedianResponse,
  GetTopNSalariesResponse,
  ServiceError,
} from "../schemas";

@Injectable()
export class GetDatasetsService {
  getAverage(): GetAverageResponse | ServiceError {
    //calls to db
    return { average: 0 };
  }

  getMedianSalary(): GetMedianResponse | ServiceError {
    //calls to db
    return { median: 0 };
  }

  getTopNSalaries(n = 10): GetTopNSalariesResponse | ServiceError {
    //calls to db
    return { topSalaries: [] };
  }
}
