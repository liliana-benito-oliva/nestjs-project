import { ApiProperty } from "@nestjs/swagger";

export type DatasetMethods = "get-average" | "get-median" | "get-top-salaries";

export class GetDatasetsRequest {
  @ApiProperty({ example: ["get-average", "get-median", "get-top-salaries", "get-average-by-gender", "get-median-by-gender", "get-top-salaries-by-gender"], name: 'methods[]' })
  methods: DatasetMethods[];
}
