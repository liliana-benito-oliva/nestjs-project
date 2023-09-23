import * as Z from "myzod";

const serviceErrorSchema = Z.object({
  cause: Z.string(),
  additionalData: Z.object({}).allowUnknownKeys().optional(),
});

export type ServiceError = Z.Infer<typeof serviceErrorSchema>;

export const isServiceError = (
  evaluated: ServiceError | any
): evaluated is ServiceError => !!(evaluated as ServiceError).cause;

const esErrorSchema = Z.object({
  method: Z.string(),
}).and(serviceErrorSchema);

export type ESError = Z.Infer<typeof esErrorSchema>;
