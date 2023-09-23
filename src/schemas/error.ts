import * as Z from "myzod";

const serviceErrorSchema = Z.object({
  cause: Z.string(),
  additionalData: Z.object({}).allowUnknownKeys().optional(),
});

export type ServiceError = Z.Infer<typeof serviceErrorSchema>;

//TODO
export const isServiceError = (
  evaluated: ServiceError | any
): evaluated is ServiceError => !!(evaluated as ServiceError).cause;
