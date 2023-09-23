import * as Z from "myzod";

const getProfilesFiltersSchema = Z.object({
  name: Z.string().optional(),
  party: Z.string().optional(),
  gender: Z.string().optional(),
});

export type GetProfilesFilters = Z.Infer<typeof getProfilesFiltersSchema>;

export type DatasetMethods = "get-average" | "get-median" | "get-top-salaires";

const getDatasetsRequestSchema = Z.object({
  methods: Z.array(Z.literals("get-average", "get-median", "get-top-salaries")),
});

export type GetDatasetsRequest = Z.Infer<typeof getDatasetsRequestSchema>;
