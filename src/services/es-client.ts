import { Inject, Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import {
  ESError,
  Politician,
  GetProfilesFilters,
  PoliticianFromES,
  politicianTemplate,
  PoliticiansAndPagination,
} from "../schemas";
import { simpleApiLogger } from "../common";
import { Client } from "@elastic/elasticsearch";

@Injectable()
export class ESClient {
  index = "politicians";
  loggerContext: string = "es-client";
  private readonly client: Client;

  constructor() {
    //private readonly client: ElasticsearchService //@Inject("ELASTICSEARCH_CLIENT") private readonly client: Client
    this.client = new Client({ node: "http://localhost:9200" });
    this.client.cat
      .indices({
        format: "json",
      })
      .then((indices) => {
        if (!indices.body.find((i) => i.index === this.index)) {
          this.client.indices.create({ index: this.index }).then(() => {
            this.client.indices.putTemplate({
              name: `${this.index}_template`,
              body: politicianTemplate,
            });
          });
        }
      });

    this.client.cat.templates({ format: "json" }).then((templates) => {
      if (!templates.body.find((t) => t.index_patterns.includes(this.index))) {
        this.client.indices.putTemplate({
          name: `${this.index}_template`,
          body: politicianTemplate,
        });
      }
    });
  }

  async indexBulk(
    politicians: PoliticianFromES[]
  ): Promise<{ took: number } | ESError> {
    try {
      const body = politicians.flatMap((politician) => [
        { index: { _index: this.index, _type: "_doc" } },
        politician,
      ]);
      const response = await this.client.bulk({ body });
      return { took: response.body.took };
    } catch (err) {
      const error: ESError = {
        method: "bulk",
        cause: "ellasticSearch client error",
        additionalData: err,
      };
      simpleApiLogger(
        this.loggerContext,
        "error",
        `${error.cause} in method: ${error.method}`,
        error.additionalData
      );
      return error;
    }
  }

  async getAverageQuery(gender?: string): Promise<number | ESError> {
    try {
      const genderQuery = gender
        ? { query: { bool: { filter: [{ term: { GENERO: gender } }] } } }
        : {};
      const result = await this.client.search({
        index: this.index,
        body: {
          size: 0,
          aggs: {
            average: {
              avg: {
                field: "SUELDOBASE_SUELDO",
              },
            },
          },
          ...genderQuery,
        },
      });
      return result.body.aggregations.average.value;
    } catch (err) {
      const error: ESError = {
        method: "getAverage",
        cause: "ellasticSearch client error",
        additionalData: err,
      };
      simpleApiLogger(
        this.loggerContext,
        "error",
        `${error.cause} in method: ${error.method}`,
        error.additionalData
      );
      return error;
    }
  }

  async getMedianQuery(gender?: string): Promise<number | ESError> {
    try {
      const genderQuery = gender
        ? { query: { bool: { filter: [{ term: { GENERO: gender } }] } } }
        : {};
      const result = await this.client.search({
        index: this.index,
        size: 0,
        body: {
          aggs: {
            median_salary: {
              percentiles: {
                field: "SUELDOBASE_SUELDO",
                percents: [50],
              },
            },
          },
          ...genderQuery,
        },
      });
      return result.body.aggregations.median_salary.values["50.0"];
    } catch (err) {
      const error: ESError = {
        method: "getMedian",
        cause: "ellasticSearch client error",
        additionalData: err,
      };
      simpleApiLogger(
        this.loggerContext,
        "error",
        `${error.cause} in method: ${error.method}`,
        error.additionalData
      );
      return error;
    }
  }

  async getTopSalariesQuery({
    n = 10,
    gender,
  }: {
    n?: number;
    gender?: string;
  }): Promise<Politician[] | ESError> {
    try {
      const genderQuery = gender
        ? { query: { bool: { filter: [{ term: { GENERO: gender } }] } } }
        : {};
      const result = await this.client.search({
        index: this.index,
        size: 10,
        body: { sort: [{ SUELDOBASE_SUELDO: "desc" }], ...genderQuery },
      });

      const topPoliticians = result.body.hits.hits.map((hit) => hit._source);
      return topPoliticians;
    } catch (err) {
      const error: ESError = {
        method: "getTopSalaries",
        cause: "ellasticSearch client error",
        additionalData: err,
      };
      simpleApiLogger(
        this.loggerContext,
        "error",
        `${error.cause} in method: ${error.method}`,
        error.additionalData
      );
      return error;
    }
  }

  async getPoliticiansWithPagination(
    params: GetProfilesFilters
  ): Promise<PoliticiansAndPagination | ESError> {
    try {
      const { gender, party, name, charge } = params;
      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const result = await this.client.search({
        index: this.index,
        from: (page - 1) * pageSize,
        size: pageSize,
        body: {
          query: {
            bool: {
              must: [
                gender ? { match: { GENERO: gender } } : { match_all: {} }, // Filter by gender
                name ? { fuzzy: { NOMBRE: name } } : { match_all: {} }, // Fuzzy search on name
                charge ? { match: { CARGO: charge } } : { match_all: {} },
                party
                  ? { match: { PARTIDO_PARA_FILTRO: party } }
                  : { match_all: {} }, // Filter by party
              ],
            },
          },
        },
      });

      const politicians = result.body.hits.hits.map((hit) => hit._source);
      return { next: +page + 1, pageSize, politicians };
    } catch (err) {
      const error: ESError = {
        method: "getPoliticians",
        cause: "ellasticSearch client error",
        additionalData: err,
      };
      simpleApiLogger(
        this.loggerContext,
        "error",
        `${error.cause} in method: ${error.method}`,
        error.additionalData
      );
      return error;
    }
  }
}
