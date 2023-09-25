import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class GetProfilesFilters {
  @ApiProperty({ required: false, example: "Antonio", type: String })
  @IsOptional()
  name: string;

  @ApiProperty({ required: false, example: "Partido Popular", type: String })
  @IsOptional()
  party: string;

  @ApiProperty({ required: false, enum: ["Hombre", "Mujer"], type: String })
  @IsOptional()
  gender: string;

  @ApiProperty({ required: false, example: "Alcalde", type: String })
  @IsOptional()
  charge: string;

  @ApiProperty({ required: false, example: 1, type: Number })
  @IsOptional()
  page = 1;

  @ApiProperty({ required: false, example: 1, type: Number })
  @IsOptional()
  pageSize = 10;
}
