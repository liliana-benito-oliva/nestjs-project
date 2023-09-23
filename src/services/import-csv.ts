import { Injectable } from '@nestjs/common';
import { ServiceError } from '../schemas';

@Injectable()
export class ImportCsvService {
  postCsv(): string | ServiceError {
    //calls to insert into db
    return 'ok'
  }
}
