import { Module } from "@nestjs/common";
import {
  GetDatasetsController,
  GetProfilesController,
  ImportCsvController,
} from "./controllers";
import {
  GetDatasetsService,
  GetProfilesService,
  ImportCsvService,
} from "./services";

@Module({
  imports: [],
  controllers: [
    GetDatasetsController,
    GetProfilesController,
    ImportCsvController,
  ],
  providers: [GetDatasetsService, GetProfilesService, ImportCsvService],
})
export class AppModule {}
