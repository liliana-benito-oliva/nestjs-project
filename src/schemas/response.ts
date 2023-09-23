import * as Z from "myzod";
import { politicianSchema } from "./politician";

export const responseCodes = {
  "200": "OK",
  "201": "CREATED",
  "400": "BAD_REQUEST",
  "500": "INTERNAL_SERVER_EROR",
};

const responseGenericSchema = Z.object({
  code: Z.number(),
  description: Z.string(),
  body: Z.object({}).allowUnknownKeys().optional(),
});

export type ResponseGeneric = Z.Infer<typeof responseGenericSchema>;

const getAverageResponseSchema = Z.object({
  average: Z.number(),
});

export type GetAverageResponse = Z.Infer<typeof getAverageResponseSchema>;

const getMedianResponseSchema = Z.object({
  median: Z.number(),
});

export type GetMedianResponse = Z.Infer<typeof getMedianResponseSchema>;

const getTopNSalariesResponseSchema = Z.object({
  topSalaries: Z.array(politicianSchema),
});

export type GetTopNSalariesResponse = Z.Infer<
  typeof getTopNSalariesResponseSchema
>;

const getDatasetsResponseSchema = getAverageResponseSchema
  .optional()
  .and(getMedianResponseSchema.optional())
  .and(getTopNSalariesResponseSchema.optional());

export type GetDatasetsResponse = Z.Infer<typeof getDatasetsResponseSchema>;
