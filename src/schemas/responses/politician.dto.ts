import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class PoliticianDto {
  @IsString()
  @ApiProperty()
  NOMBRE: string;

  @ApiProperty()
  @IsString()
  PARTIDO: string;

  @ApiProperty()
  @IsString()
  PARTIDO_PARA_FILTRO: string;

  @ApiProperty()
  @IsString()
  GENERO: string;

  @ApiProperty()
  @IsString()
  CARGO: string;

  @ApiProperty()
  @IsString()
  CARGO_PARA_FILTRO: string;

  @ApiProperty()
  @IsString()
  INSTITUCION: string;

  @ApiProperty()
  @IsString()
  CCAA: string;

  @ApiProperty()
  @IsNumber()
  SUELDOBASE_SUELDO: number;

  @ApiProperty()
  @IsNumber()
  COMPLEMENTOS_SUELDO: number;

  @ApiProperty()
  @IsNumber()
  PAGAEXTRA_SUELDO: number;

  @ApiProperty()
  @IsNumber()
  OTRASDIETASEINDEMNIZACIONES_SUELDO: number;

  @ApiProperty()
  @IsNumber()
  TRIENIOS_SUELDO: number;

  @ApiProperty()
  @IsNumber()
  RETRIBUCIONMENSUAL: number;

  @ApiProperty()
  @IsNumber()
  RETRIBUCIONANUAL: number;

  @ApiProperty()
  @IsString()
  OBSERVACIONES: string;
}