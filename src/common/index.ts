import { responseCodes, ResponseGeneric, ServiceError } from "../schemas";

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
  selectedFunction(`${context}: ${message}`, additionalData);
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
