import { ApiProperty } from "@nestjs/swagger";

export type DatasetMethods = "get-average" | "get-median" | "get-top-salaries";

export class GetDatasetsRequest {
  @ApiProperty({ example: ["get-average", "get-median", "get-top-salaries"], name: 'methods[]' })
  methods: DatasetMethods[];
}
