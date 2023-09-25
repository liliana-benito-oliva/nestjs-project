import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PoliticianDto } from './politician.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PoliticiansAndPaginationDto {
  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
  pageSize: number;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PoliticianDto)
  politicians: PoliticianDto[];
}