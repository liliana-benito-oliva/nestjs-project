import { Module } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import {
  GetDatasetsController,
  GetProfilesController,
  ImportCsvController,
} from "./controllers";
import { ESClient } from "./services/es-client";
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
  providers: [GetDatasetsService, GetProfilesService, ImportCsvService, ESClient],
})
export class AppModule {}
