import { Injectable } from "@nestjs/common";
import { GetProfilesFilters, Politician, ServiceError } from "../schemas";

@Injectable()
export class GetProfilesService {
  getProfiles(params: GetProfilesFilters): Politician[] | ServiceError {
    //calls to db
    return [];
  }
}
