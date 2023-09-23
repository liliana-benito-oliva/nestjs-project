import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { importCsv } from "csv-elasticsearch";
import { ESError } from "../schemas";
import { ESConfig } from "./es-config";

export class ESClient extends ElasticsearchService {
  constructor() {
    super(ESConfig.config(process.env.ELASTIC_SEARCH_URL));
  }

  public async postCsv(filePath, index): Promise<number | ESError> {
    const result =  await importCsv({
      client: this,
      index,
      filePath,
    });
    if (result.erroredDocuments && result.erroredDocuments.length) {
        return {
            method: 'bulk',
            cause: 'error in documents',
            additionalData: result.erroredDocuments
        }
    }
    return result.count;
  }
}
