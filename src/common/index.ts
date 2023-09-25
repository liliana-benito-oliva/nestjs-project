import { Readable } from "stream";
import * as csv from "csv-parser";
import {
  politicianFromES,
  PoliticianFromES,
  responseCodes,
  ResponseGeneric,
  ServiceError,
} from "../schemas";

const functionDictionary = {
  info: console.log,
  debug: console.debug,
  error: console.error,
};

export const simpleApiLogger = (
  context: string,
  level: "error" | "debug" | "info",
  message: string,
  additionalData?: object
): void => {
  const selectedFunction = functionDictionary[level];
  selectedFunction(
    `${context}: ${message}${
      additionalData ? `: ${JSON.stringify(additionalData)}` : ""
    }`
  );
};

export const buildErrorResponseFromServiceError = (
  code: number,
  serviceError: ServiceError
): ResponseGeneric => ({
  code,
  description: responseCodes[code],
  body: {
    reason: serviceError.cause,
    details: serviceError.additionalData,
  },
});

export const getPathFormated = (path: string) => {
  const home =
    __dirname.indexOf("/dist") !== -1
      ? __dirname.split("/dist")[0]
      : __dirname.split("/src")[0];
  return `${home}/${path}`;
};

export const customCsvParse = (csvData: string): PoliticianFromES[] => {
  const lines: string[] = csvData.split("\n");
  //const keys: string[] = Object.keys(politicianFromES);
  return lines.slice(1, lines.length - 1).map((row: string) => {
    const attributes = row.split(";");
    return {
      NOMBRE: attributes[0],
      PARTIDO: attributes[1],
      PARTIDO_PARA_FILTRO: attributes[2],
      GENERO: attributes[3],
      CARGO: attributes[4],
      CARGO_PARA_FILTRO: attributes[5],
      INSTITUCION: attributes[6],
      CCAA: attributes[7],
      SUELDOBASE_SUELDO: formatNumber(attributes[8]),
      COMPLEMENTOS_SUELDO: formatNumber(attributes[9]),
      PAGAEXTRA_SUELDO: formatNumber(attributes[10]),
      OTRASDIETASEINDEMNIZACIONES_SUELDO: formatNumber(attributes[11]),
      TRIENIOS_SUELDO: formatNumber(attributes[12]),
      RETRIBUCIONMENSUAL: formatNumber(attributes[13]),
      RETRIBUCIONANUAL: formatNumber(attributes[14]),
      OBSERVACIONES: attributes[15],
    };
  });
};

const formatNumber = (stringNumber: string): number =>
  stringNumber ? parseFloat(stringNumber.replace(",", ".")) : 0;
